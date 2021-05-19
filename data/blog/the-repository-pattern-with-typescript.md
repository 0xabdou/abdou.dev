---
title: "The Repository pattern with Typescript"
summary: "Repositories are used to encapsulate the logic used to access data sources. Learn more about this concept, and how to implement the it using Typescript"
tags: [typescript, testing]
publishedAt: '2021-02-15'
banner: "/static/images/blog/the-repository-pattern-with-typescript/banner.png"
---

Hi 👋
In this article, I'm going to talk about the Repository pattern, and show you how I implemented a Repository to handle authentication, for the app I'm currently working on, in a way that made it very easy for me to write tests for it. Then I'll show you how to write those tests. I will also briefly go through other topics such as dependency injection, abstraction...etc.

## The Repository
If you don't know what a Repository is, here's a fancy definition:
> Repositories are classes or components that encapsulate the logic required to access data sources. They centralize common data access functionality, providing better maintainability and decoupling the infrastructure or technology used to access databases from the domain model layer.

Now I'll try to give a more human readable version, and I'll use our authentication feature as an example.
I want users to be able to use Google to sign in to my app, the flow would be something like this:

1. The user signs in with google.
2. We retrieve the token returned from google, and send it to the backend.
3. The backend sends an access token back, which we can use for all future requests.
4. We persist the token locally, to keep the user signed in.

From this, we can see that we need 3 data sources:

1. `GoogleAuth`
2. `AuthApi`: that communicates with the backend
3. `LocalStorage`: where we persist the logged in user

And then we'll have an `AuthRepository` that internally uses these 3 data sources, and exposes a simple API that we can use to handle authentication. We'll see how to implement this in a moment, but this is how a repository works in my simple point of view.

## Abstraction is your friend
The `AuthRepository` is a very good example of abstraction. It hides implementation details from all other parties that use it. For example, a react component can use this repository, and sign the user in by just calling `authRepo.signInWithGoogle()`. The component doesn't care or know how the sign in is done, it doesn't know that we use 3 data sources to do the work. This abstraction is very useful, for instance, if we want to test the component, we can just mock the repository, and verify that `signInWithGoogle` has been called. We will be sure that the sign in will work, because we would have already written tests for `AuthRepository`. Let's write this abstraction:

```typescript
interface IAuthRepository {
  signInWithGoogle(): Promise<User>;
}
```
> NOTE1: The 'I' in 'IAuthRepository' stands for Interface (duh), and It's just a naming convention.
>
> NOTE2: There should be more function declarations in the interface, like signOut() ...etc, but I wrote only one for sake of simplicity.

And just how the repository abstracts the implementation details, the data sources also should do the same thing. Let's wite their interfaces too:

```typescript
interface IGoogleAuth {
	// returns a token
    signIn(): Promise<string>
}

interface IAuthApi {
  signInWihGoogle(token: string): Promise<User>;
}

interface ILocalStorage {
	write(key: string, value: string): Promise<null>;
	read(key: string): Promise<string | null>;
}
```
You can define the `User` type any way you want. To keep it simple, I'll just use the following:

```typescript
type User = {
	accessToken: string
}
```
Now we have everything we need to start implementing the `AuthRepository`

## Implementations
We will create a class that implements `IAuthRepository`, and give concrete implementations for all its function declarations (in this case we only have one)

```typescript
class AuthRepository implements IAuthRepository {
    signInWithGoogle(): Promise<User> {
        throw new Error("Method not implemented.");
    }
}
```
We need access to our data sources inside the class, so let's make it depend on them.

```typescript
class AuthRepository implements IAuthRepository {
    private _authApi: IAuthApi;
    private _googleAuth: IGoogleAuth;
    private _localStorage: ILocalStorage;

    constructor(
        authApi: IAuthApi,
        googleAuth: IGoogleAuth,
        localStorage: ILocalStorage,
    ) {
        this._authApi = authApi;
        this._googleAuth = googleAuth;
        this._localStorage = localStorage;
    }

    signInWithGoogle(): Promise<User> {
        throw new Error("Method not implemented.");
    }
}
```
We simply added some private fields, and initialized them inside the constructor.
The fields should be private because it doesn't make sense to be able to access a data source from the repository.

Also, It's important to pass the dependencies in the constructor. First, we don't have to write implementations for the data sources right away as you can see. Also, injecting the dependencies like this enables us to pass-in mock implementations of the data sources, which will make testing a breeze.

Now we can write the actual implementation of `signInWithGoogle()`:

```typescript
async signInWithGoogle(): Promise<User> {
      const token = await this._googleAuth.signIn();
      const user = await this._authApi.signInWihGoogle(token);
      await this._localStorage.write('accessToken', user.accessToken);
      return user;
}
```
That's it, our repository is now implemented. We can immediately start testing it, which we'll do in a moment. But before that...

## ERROR HANDLING
We haven't done any error handling so far. Our repository looks very unsafe at the moment, anything can go wrong. For instance, the user's network may be unstable, and some request will timeout. Or something can go wrong with google auth, you never know. It's a very messy and unpredictable world out there in the data layer.

Yes you can wrap all calls to the repository in a `try catch` block but... do you really want to do that? First of all, you won't be obligated to do so, no linter rules will remind you, there won't be any compile time errors, you can easily forget it. You don't want your app to crash because you forgot to catch an error. Second of all, `try catch` is just ugly.

There is another benefit of using the repository pattern: You can catch all errors inside the repository, and you'll never need to write a `try catch` again outside of it. First, we need to specify all types of errors that can occur during authentication, to keep it simple, let's say that 2 types of errors can happen:

1. **Network error**: If the user is offline or the connection is unstable
2. **General error**: Something else happened

We can represent these errors in many ways, I prefer to use an enum:

```typescript
enum AuthError {
  general,
  network,
}
```
Then, we need to make our function return an `AuthError` instead of a `User` if some exception was raised. At first, I tried to make it return a union `AuthError | User`, but I didn't find a good way to check exact type of the return value. I could use a type guard, but I think there is a nicer way. The [fp-ts][fp-ts] library provides us with many functional programming goodies, including the `Either` type:

```typescript
type Either<E, A> = Left<E> | Right<A>
```
As you can see, an instance of `Either` is either an instance of Left or Right. Convention dictates that Left is used for failure and Right is used for success [(see the docs)][fp-ts-docs].

Let's change the return type of our `signInWithGoogle` function, to return `Either<AuthError, User>`, we should do it in both the interface and the implemented class, here's how it'll look like:

```typescript
 interface IAuthRepository {
   signInWithGoogle(): Promise<Either<AuthError, User>>;
 }
```
In the implementation, we return `right(user)` instead of `user` if everything went well, if not, we return `left(error)`:

```typescript
async signInWithGoogle(): Promise<Either<AuthError,User>> {
  try {
    const token = await this._googleAuth.signIn();
    const user = await this._authApi.signInWihGoogle(token);
    await this._localStorage.write('accessToken', user.accessToken);
    return right(user);
  } catch (e) {
    // Check for the type of error here
    // and return the corresponding value
    // if (e is a network error)
    //   return left(AuthError.network);
    return left(AuthError.general);
  }
}
```
Now, whenever we call `signInWithGoogle`, we must check if the returned value is of type `left` or `right`, and then proceed:

```typescript
const result = await authRepo.signInWithGoogle();
if (isRight(result)) {
  // The sign in succeeded
  const user = result.right;
  // do something with the user
} else {
  // The sign in failed
  const error = result.left;
  // do something with the error
}
```
Using this method, all exceptions stop propagating when they arrive to the repository, and they're converted to regular objects that we can deal with later.

## Testing
Here comes the fun part, since we implemented our repository the way we did, it's very easy to test it now. Since all of its dependencies are injected in the constructor, we can simply create mock dependencies, and instanciate a repository with them. You can get away with this using jest mocking, but I think there's a better way.

### Enter Mockito
There's a very cool library called [ts-mockito][ts-mockito], it works very well when you use dependency injection in your code (as we're doing now). It allows you to create mocks, stub function calls, and many other cool features, definitely check it out! I'm going to use it to test our `AuthRepository`.

Take a look at this long test file, I will walk you through it using comments:

```typescript
import { left, right } from "fp-ts/lib/Either";
import { anything, instance, mock, reset, verify, when } from "ts-mockito";
/// Also import the interfaces and other things...

/// Create mock dependencies
const MockGoogleAuth = mock<IGoogleAuth>();
const MockAuthApi = mock<IAuthApi>();
const MockStorage = mock<ILocalStorage>();

/// Instatiate AuthRepository with the mocks
const authRepo: IAuthRepository = new AuthRepository(
  instance(MockAuthApi),
  instance(MockGoogleAuth),
  instance(MockStorage)
);

// Reset the mocks before each test
// So tests won't be dependent of each other
beforeEach(() => {
  reset(MockAuthApi);
  reset(MockGoogleAuth);
  reset(MockStorage);
});

// Testing `signInWithGoogle`
describe("signInWithGoogle", () => {
  // Test case 1
  test("should persist and return the user if all goes well", async () => {
    // arrange
    const googleToken = "googleToken";
    const user: User = { accessToken: "accessToken" };
    // When signIn is called on MockGoogleAuth, resolve with `googleToken`
    when(MockGoogleAuth.signIn()).thenResolve(googleToken);
    // When signInWithGoogle is called on MockAuthApi, resolve with `user`
    when(MockAuthApi.signInWihGoogle(googleToken)).thenResolve(user);
    // act
    const result = await authRepo.signInWithGoogle();
    // assert
    // the result should be `right(user)`
    expect(result).toStrictEqual(right(user));
    // MockGoogleAuth.signIn should be called once
    verify(MockGoogleAuth.signIn()).once();
    // MockAuthApi.signInWithGoogle should be called once, with `googleToken`
    verify(MockAuthApi.signInWihGoogle(googleToken)).once();
    // The access token should be persisted
    verify(MockStorage.write("accessToken", user.accessToken)).once();
  });

  test("should return an auth error if something wrong happened", async () => {
    // arrange
    // Make it so GoogleAuth throws an exception
    when(MockGoogleAuth.signIn()).thenReject(new Error("some error"));
    // act
    const result = await authRepo.signInWithGoogle();
    // assert
    // the result should be `left(AuthError.general)`
    expect(result).toStrictEqual(left(AuthError.general));
    // MockGoogleAuth.signIn should be called once
    verify(MockGoogleAuth.signIn()).once();
    /// MockAuthApi.signInWithGoogle should never be called
    verify(MockAuthApi.signInWihGoogle(anything())).never();
    // No access token should be persisted
    verify(MockStorage.write("accessToken", anything())).never();
  });
});

```
Hopefully, this testing strategy was clear, and it gave you an idea of how to test your code in the future. I think it's pretty simple.

## Conclusion
Here are the main points we learned throughout this article:

* **The repository**: A component/class that groups multiple data sources, and exposes an API, that hides all its implementation details. It also serves as an "error buster", it catches all those wild exceptions, and returns regular objects in case of a failure.
* **Abstraction (using interfaces)**: Using interfaces gives you the ability to have multiple implementations for the same API (mock and real implementations for example). It also makes it easy to change `AuthApi` for example, from a REST implementation to GraphQL... etc.. It speeds up the development process, especially if you're working as a team. You just setup an interface, and start implementing other things that depend on it. As you saw in this article, we implemented the whole repository without having any implementations of `AuthApi`, nor any of its other dependencies.
* **Dependency injection**: We didn't get into much details of DI in this article, but we saw how injecting dependencies into a class constructor, makes it very easy to test it. Also, without doing this, we wouldn't have the ability to implement the repository, until we implement all its dependencies. You can say that **abstraction** and **DI** complement each other.
* **Some useful libraries**:
	1. **[ts-mockito][ts-mockito]**: A very convenient library that helps you with mocking, and testing in general.
	2. **[fp-ts][fp-ts]**: A library that brings all of functional programming goodies to typescript. We only used the `Either` type in this article, but it offers a lot more.

I hope you had a good read, bye bye.
![bye bye][bye-bye]

[fp-ts]:https://github.com/gcanti/fp-ts#--------
[fp-ts-docs]:https://gcanti.github.io/fp-ts/modules/Either.ts.html
[ts-mockito]:https://github.com/NagRock/ts-mockito#ts-mockito--
[bye-bye]:https://media.giphy.com/media/Ru9sjtZ09XOEg/giphy.gif