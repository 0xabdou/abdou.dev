---
title: "I built a chat app using React and GraphQL"
summary: "How I went from zero experience in web development, to cloning Facebook Messenger and building a full-fledged chat app"
tags: [typescript, javascript, react, graphql]
publishedAt: '2021-04-28'
banner: "/static/images/blog/i-built-a-chat-app-using-react-and-graphql/banner.jpg"
---

#### TLDR

You can try the app here: [chat.abdou.dev][hosted-app]

You can view the source code in this [github repo][github-repo]

# Intro

About 4 months ago, I decided to start learning web development, and I thought that the best way to know that I became a job-ready developer, is to build a complex, real-world application, from scratch. My first choice was to build a chat app. It seemed complex enough for me, and I knew I would learn many things along the way.

# Disclaimer

I think it's only fair to say that, although I had no experience in web dev, I wasn't a complete newbie to the coding world. I did some C programming, I worked with Flutter a little, and I think it made it a lot easier for me to pick up all those new technologies like React. Otherwise, this would have taken me a lot more than 4 months :). Also, here's my GitHub graph in the aftermath.
![Github graph][github-graph]

# The first steps

I knew that I had to learn the basics. It doesn't make sense to start learning the crazy stuff (React) first, before having a solid (meh) understanding of HTML, CSS, and Javascript (SPOILERS: I ended up learning Typescript instead).

So, my first destination was FreeCodeCamp. It had a big nice curriculum of everything you need to get you started in web dev. I finished the first 3 certifications, and by then, I was ready to go out into the wilderness, and start learning on my own.

# Building the app

Now that I had all the basics I needed, it was time to start building the chat app.

# The tech stack

I took a look around some job listings here and there, to see what's popular in the market, and I finally decided to use these technologies for my next project (non-exhaustive list):

## Frontend

- **React**
- **Redux**: I'm building a full fledged chat app after all. I will need a solid state management solution.
- **MaterialUI** for components/styling
- **Apollo client** for GraphQL

## Backend

- **Node.js** and **Express**.
- **Apollo server** for GraphQL
- **TypeGraphQL**:  for building GraphQL APis
- **PostgreSQL** in combination with **Prisma** (The next generation ORM, very cool stuff) for the database.

Did I mention that I used Typescript throughout the project? I really find it hard to work without type-safety.

## Setup

At that time, I've been hearing about **Next.js**, and it seemed like something I'd want to learn, so I decided to use it. I was also planning to do all the coding using TDD (test driven development), so setting up a test environment was a must. After lots of headaches, I finally got **jest** and **React Testing Library** to work with Typescript. Now I'm ready to start coding.

## App features

### Authentication

To make things simple, I used Google for authentication. The user signs in with Google, I grab the token and send it to the backend. If no user is associated with that Google account, I create it, then proceed.

I spent some time researching different authentication methods, the simplest one was to use **jwt**. Other solutions like auth0 seemed very complicated. I tried to implement jwt authentication in the best way I could. I didn't use local storage to store any tokens (although it's widely used in many tutorials), and I used a refresh/access token strategy:

- **Refresh token**: it's generated with a very long expiry date (it basically never expires), and it is set in a http-only cookie, so the client can never access it. It's used to generate new access tokens when they expire.
- **Access token**: it's generated with a low expiration time (30min), and it's only stored in memory (in a variable) in the frontend. It is sent with all future http requests to make authenticated actions.

I also implemented auto-refreshing in the frontend, so when the access token expires, a new one is generated without the user noticing anything. Not very sophisticated, but I'm happy with the results.

### User profiles

Each user has a unique username, a name, and a profile photo. These are all public, and can be viewed by anyone. The user has the ability to change his username, name, and upload new profile pictures. It's kinda worth noting that pictures are resized to different sizes (small, medium, and original). So we don't need to fetch a 1280x1024 picture for a 48x48 user avatar.

### Friends

Each user can send friend requests to other users, and they can either accept or decline them, exactly like facebook. A user can also block another user, preventing them from sending further friend requests and messages. Being friends with someone makes you able to text them and view their active status (last seen date) if they don't hide it.

### Notifications

For now, they only show if someone accepted your friend request. I can't think of any other use-case at the moment.

### Messaging

The core feature of the app, It was the last one implemented after all the above. I tried to clone Facebook Messenger's behaviour. It wasn't that hard since I was already familiar with everything at this point, but I still faced some very annoying problems:

- **The delivery status**: If you look at facebook messenger, you'll notice that every message has a delivery status, that can be either `SENDING`, `SENT`,
  `RECEIVED`, `DELIVERED`, or `SEEN`. Trying to implement it exactly the same way messenger did, was very tricky. I didn't think about this problem from the start, so I ended up modifying many things to get it working.
- **Race conditions**: You usually expect things to happen in a certain order, for example, a message status can go from `SENDING` to `SENT`, and then to
  `DELIVERED`, but sometimes it's not the case. If the internet is slow for example, you can get notified that the message was delivered, before a response has reached the client to confirm that the message was sent, therefore the status goes from `SENDING` to `DELIVERED`, and then to `SENT`, which is not at all desired, and can lead to annoying bugs, like the message being shown twice, or not at all. Handling these race conditions was not straightforward, and I think the code became a little messy afterwards.

The user can also send multiple images/videos with each message.

## Realtime

Before starting the messaging feature, I always thought I was going to use sockets to make it realtime. Then I figured that there's a chance GraphQL has a solution for this kind of problem, and I was right. GraphQL supports
**Subscriptions**, which are (quoting [Apollo docs][apollo-docs]) "_useful for notifying your client in real time about changes to back-end data, such as the creation of a new object or updates to an important field_". They were perfect for this use-case, and implementing them was fairly simple.

## Next.js and Vite.js

Almost halfway through the project, I realized that I'm not really benefiting from most of Next.js features (Or maybe I didn't know how to?). At the same time I discovered **Vite.js** that uses **esbuild**, which is the fastest bundler out there, so I switched to it. It was indeed really fast, I could make changes to the code and see them instantly in the browser, so I'm sticking with it for now. I'm not completely giving up on Next.js, I will definitely learn it later, while building a suitable project (A blog/portfolio for example). After all, concepts like Server Side Rendering are a little too advanced, and I'm still new to all of this.

## Hosting

I used digitalocean to host both the front and the backend. I bought a droplet for 5$/month and put everything inside. Deploying was fun, I always disliked everything related to IP addresses, DNS, firewalls... but it turned out to be not that bad, everything has an article/tutorial explaining all the details, and you just have to follow.

For file hosting, you'd usually want to use some cloud storage solution, like an Amazon s3 bucket for example, but it doesn't make sense to pay for it separately, since this is just a personal project. So I decided to just use the droplet's memory instead.

# The hard parts

These are the things I found difficult the most. They sometimes made me sit and consider my options of quitting the whole thing, and becoming a full time baker.

## Configuration

I'm not sure what to call it, so I called it configuration, but you know... when you're trying to make jest work, but it just won't work, even though you followed all the instructions. To finally discover, by accident, in a comment buried deep inside a github conversation, that you have to remove a certain line from you tsconfig.json... Or that time when I wanted to use decorators inside a Next.js project, but it didn't work, so I had to painfully experiment with Babel config, which I know absolutely nothing of, until it started working, but then I discovered that Next.js HMR broke, so I had to give up using decorators after all that wasted time. The funny thing is, I tried to use them in the backend project, and they just worked from the first try.

I always stumble upon terms like webpack, bundlers, build tools..., but they remain foreign to me, I just use them without knowing anything about how they work, and I feel bad about it. Maybe I should start learning them seriously, maybe that will help me with those time-consuming configuration problems in the future.

## Styling

Styling was one of the hardest things, I didn't know how should I style my components. Should I use plain CSS files? Should I use CSS modules instead? Should I use bootstrap or something more modern like Tailwind? It was a really hard decision to make. I used CSS modules at first, and then switched to Styled Components, to finally settle down with MaterialUI. At last, I had to migrate everything to use MaterialUI and its JSS solution. It was a real mess, the refactoring was very time-consuming, and I still think I'm not doing things as they're supposed to be done. Now I can't even add dark-mode without modifying every single component in the code base.

## Virtualization

I already use pagination, if a conversation has a 1000 messages, I don't fetch them all at once. I fetch only the first 30, and when the user scrolls all the way to the top, I fetch another 30, and so on and so forth.

This is not enough, because after fetching all those 1000 messages, we will have a 1000 message elements in the DOM, and that's not good performance wise. Virtualization solves this problem by rendering only the visible elements. Let's say the user's viewport can fit 20 messages, then only 20 (usually a little more than 20) elements will be present in the DOM, and while the user scrolls, the invisible messages will be replaced by the visible ones, but the DOM will always have the same number of elements.
(The below illustration is from this [tweet][tweet]
![virtualization explained][virtualization]

Some libraries like Virtuoso and React Window are doing a nice job implementing virtualization for us, but in my case, both of them didn't work well. Message elements have variable heights, and those heights must be calculated before rendering, along with many other calculations. When the list of messages gets big, those calculations become very heavy, and the app becomes unusable. I spent so much time trying to make virtualization work, but in the end, I decided it's better to stop trying, and just render everything into the DOM. So far I haven't noticed any performance issues, and I checked Facebook Messenger and Whatsapp Web, they both don't use virtualization, it was a big relief knowing that Facebook is doing the same thing I'm doing :).

In mobile development (or at least in Flutter), you have built-in virtualization that's working out-of-the-box, and until now, I always thought that it's something standard, and you can find it in all other SDKs, I took it for granted. I'm still confused why React doesn't have such a thing, is virtualization not that important in the web?

## Keeping everything tested

Since I was doing test driven development, I had to write tests for almost every piece of production code. Keeping your codebase well tested is a very important thing, there's no doubt about that, but this process becomes extremely tedious. Some tests are harder than others, and sometimes you spend 90% of the time writing mock objects for a test, and only 10% to write the actual testing, and if, god forbid, you made changes to the code you tested, you'll have to go through those tests all over again.

In the end, it's always worth it. Having a strong test suite gives you confidence that your code is actually working. Whenever you want to make a new commit, you just run those tests, and if everything passes, you're good to go.

![Frontend test suite][test-suite]

# Things I'm not proud of

## Theming

I know I already complained about styling, but theming is one of the things that I didn't do correctly, and I blame myself for that. I knew that I shouldn't hardcode colors, or font sizes, or anything related to styling, inside every component. I had to use a global theme instead, and material UI provided a convenient way to do it, but sill, I was always in a rush to see the results of my work on screen, I just had to build those components as quickly as possible, telling myself that I will refactor things later, but little did I know. At one point, it became too much, and I was too lazy to refactor everything, so I just gave up and left things as they are.

Next time, I will write down my global theme first, before writing any component code.

## Routing

I'm pretty sure I could've implemented routing a lot better than the way it is now. I didn't discover React Router until I had already finished the whole authentication feature. I was using conditional rendering, if the user is logged in I display the main screen, if not I display the login screen. After that, I started using React Router, and I'm still not sure if I'm fully utilizing its power, I had to use some hacky tricks to get things working as I wanted
(I needed a custom back button, that does not always act like the one in the browser), which wasn't very clean in my opinion. I'll definitely give more time and thought to routing in my next project.

## App size

Lastly, the app is over 1.4 MB in size, I'm not sure, but I think it should be a lot smaller than this. I will take some time later to analyze the issue.

# Final thoughts

This little journey was fun, and you can say I'm satisfied with the final result. I think I can finally call myself a "fullstack developer"? I know There are many other things in this field that I have yet to explore and get good at, but this is just the start.

I don't know where to go from here, so I'll take my time reflecting and deciding on the next steps. Otherwise, I hope you had a good read, feel free to try out the app and leave me some feedback. Bye bye!

![bye bye][bye-bye]

[apollo-docs]:https://www.apollographql.com/docs/react/data/subscriptions/

[hosted-app]:https://chat.abdou.dev/

[github-repo]:https://github.com/0xabdou/very_good_chat

[github-graph]:https://dev-to-uploads.s3.amazonaws.com/uploads/articles/849vrcxceax5mlyr98dk.png

[virtualization]:https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nkqgoqxbbr1bn91fsmme.png

[tweet]:https://twitter.com/addyosmani/status/1104645563138506753

[test-suite]:https://dev-to-uploads.s3.amazonaws.com/uploads/articles/128skuxi3e3mkk6ovsgc.png

[bye-bye]:https://media.giphy.com/media/w89ak63KNl0nJl80ig/giphy.gif