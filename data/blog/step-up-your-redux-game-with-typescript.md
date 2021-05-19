---
title: "Step up your Redux game with Typescript"
summary: "Learn how to make your Redux strongly typed, so you can benefit from code completion, and all the other good stuff that comes with Typescript's type system"
tags: [typescript, redux, react]
publishedAt: '2021-02-21'
banner: "/static/images/blog/step-up-your-redux-game-with-typescript/banner.jpg"
---

Hi 👋

I spent some time experimenting with Redux and Typescript, and I finally got my head around it. I documented what I learned in this article, which will also serve as a tutorial on how to use Redux with Typescript, particularly in a React application.

While learning redux, I was trying to answer these questions:

1. How can I fully benefit from Typescript's type system?
2. How to properly inject dependencies into redux? (Hard dependencies are a code smell after all)
3. How do I test all of this?

I answered all these questions throughout this article, enjoy!

> NOTE: This is not a complete beginner tutorial, if you find it difficult to follow, I advise you to take a look at [Typescript Quick Start][rtk-tutorial] tutorial from RTK.

## What we are building

We are going to build a small React app that only has an authentication feature. Meaning that you can login, view the current user, and logout. This is enough to cover most of redux important concepts. There will be no backend, only mock data. If you want, you can later replace the mocks with a real API, and the Redux part will still work perfectly.

Here's a sneak peak of the final product.

![end result][end-result-gif]

## Getting started

I made a base project for your convenience, it has all the required packages, components, and services. So we can focus only on the Redux part. All you need to do is clone the github repo and install the packages:

```zsh
git clone https://github.com/aouahib/redux_app_base.git
cd redux_app_base
npm install
npm start
```

Visit your localhost. You should see the login page.

### The folder structure

Inside `/src/features/auth` is everything we need for our authentication feature, the only thing missing is the redux logic.

1. the `data/` subfolder contains the authentication repository and all its dependencies. It's there where we fake API calls and return mock data.
2. the `types/` subfolder contains types used mainly by the data layer, but also used in other places throughout the app.
3. the `ui/` subfolder contains React components.

Feel free to explore more on your own.

# The Store

Let's start by adding a store to our app. We will be using [Redux Toolkit][redux-toolkit] package, it's the recommended way of using Redux. Create a new file `store.ts` inside `/src/app/` folder, and add the following code:

```typescript
import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  // TODO: Add reducers
});

const createStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export default createStore;
```

As you can see, we used `combineReducers` to create a `rootReducer`. And added the `createStore` function, that returns a store configured with our `rootReducer`. The `rootReducer` is useless for now because it's "empty", we'll add the authentication reducer to it in a moment. But first, let's add some types that will help us a lot later.

First, we need the **Store** and the **State** types. Usually, these types keep changing a lot during development, since we constantly add new reducers and modify existing ones, so it's not a good idea to write them manually, and modify them every time we make a change. That's why we have to infer them, we'll use `ReturnType` to do that, we give it a function type as a type parameter, and we get back that function's return type.

```typescript
// A function that returns a number
const foo = () => 2;

type FooReturn = ReturnType<typeof foo>;
// the type FooReturn is number
```

Since `rootReducer` is a function that returns a **State**, and `createStore` is a function that returns a **Store**, we can infer our types the same way we did in the example above. Let's also get the type of the **dispatch** method. Add these lines to your `store.ts` file:

```typescript
export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
```

# The Slice

It's time to write some redux logic, but first, let's define what a "Slice" is. Quoting the [docs][slice-docs]:

> You may be wondering, "what is a 'slice', anyway?". A normal Redux application has a JS object at the top of its state tree, and that object is the result of calling the Redux `combineReducers` function to join multiple reducer functions into one larger "root reducer". **We refer to one key/value section of that object as a "slice", and we use the term "slice reducer" to describe the reducer function responsible for updating that slice of the state**.

Fair enough, let's create our authentication slice, add a file inside `/src/features/auth/` folder, and name it `auth-slice.ts`. We need to define the type of the auth state, and while we're at it, let's also define the initial state, add this code to the file:

```typescript
import User from "./types/user";
import AuthError from "./types/auth-error";

export type AuthState = {
  currentUser: User | null,
  loading: boolean,
  error: AuthError | null,
};

const initialState: AuthState = {
  currentUser: null,
  loading: false,
  error: null,
};
```

* `currentUser`: is an object of type `User` if a user is logged in, otherwise it's `null`.
* `loading`: `true` if the user is currently logging in, we'll use it to display some kind of spinner.
* `error`: is the error that happened in the latest operation, or `null` if none happened.

Pretty simple, now let's create the actual slice:

```typescript
...
import {createSlice} from "@reduxjs/toolkit";

...

const authSlice = createSlice({
  name: 'auth',
  reducers: {},
  initialState,
});
```

We named it 'auth', we gave it the `initialState`, and an empty `reducers` object. `reducers` will stay empty, because we're not interested in plain reducers, since they only change the state, and have no side effects. We can't put any data fetching logic inside a plain redux reducer. Instead, we need to use **Middlewares**.

The middleware we'll be using is [redux-thunk][redux-thunk], it lets you write plain functions that contain async code, and dispatch them to the store. Since we used RTK's `configureStore`, the thunk middleware is automatically set up for us by default.

# Async Thunks

We'll make use of the handy `createAsyncThunk` from RTK to create our first async thunk, which will be responsible for logging the user in. Add this code to the `auth-slice.ts` file:

```typescript
...
// Add createAsyncThunk to the existing import
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

...

const loginWithEmailAndPass = createAsyncThunk(
  'auth/loginWithEmailAndPass',
  async () => {
    // TODO: login 
  }
)
```

As you can see, `createAsyncThunk` expects 2 arguments:

1. A name:  `auth/loginWithEmailAndPass`
2. A function: where we can put our async logic

This thunk does nothing for now, in order to make it useful, we need to know how we're going to use it, here's the scenario:

1. The user enters his email/pass and clicks the login button
2. we dispatch `signInWithEmailAndPassword` async thunk, passing the email and pass as argument.
3. The async function we passed to `createAsyncThunk` gets the email/pass, and makes an API call to log the user in.
    * If the login succeeds, the async function should return a `User`. The thunk middleware will dispatch an action of type `loginWithEmailAndPass.fulfilled`, with that user as a payload.
    * If the login fails, the async function should return an `AuthError` as a rejected value. the thunk middleware will dispatch an action of type `loginWithEmailAndPass.rejected`, with that error as a payload.

Since we want to make use of Typescript's type system, we need to add some type parameters. `createAsyncThunk` accepts 3 type arguments, ordered as follows:

1. The return type of the async function
2. The type of the argument passed to the async function
3. The thunk API type: it specifies the store's state type, its dispatch type, and the type of the reject value of the thunk being created (Along with other types) (This may be confusing at first but you'll understand it in a moment).

Let's start by specifying the type of our thunk API. We don't need to access the dispatch nor the state from our thunk, so we don't care about their types. We only need to specify the type of the rejected value, so our thunk API type will be like this:

```typescript
type ThunkApi = {
  rejectValue: AuthError
};
```

Now let's add types to our `createAsyncThunk` function:

```typescript
...
import {EmailPass} from "./types/email-pass";

...

const loginWithEmailAndPass = createAsyncThunk<User, EmailPass, ThunkApi>(
  'auth/loginWithEmailAndPass',
  async () => {
    // TODO: login 
  }
)
```

Now you'll notice a compile time error, since we must return `Promise<User | RejectValue<AuthError>>`, our thunk is typed 😉.

### Dependency injection

Before we continue, there's something we have to take care of. We will be using `AuthRepository` (located at `/src/features/auth/data/`) to make API calls. We need to access it from our async thunk. We can do this in different ways: we can use a global variable (❌ not clean), we can pass it as an argument to our async thunk (❌ not that clean too), or we can inject it once into our thunk middleware when creating the store, and have access to it inside all our async thunks, which will also make testing cleaner (✅ clean). Let's do it.

First, let's instantiate an `AuthRepository`. Usually, it's better to put all dependencies like this inside a single file, or use some kind of container to store them. Since we don't have that many dependencies, I'm not going to use a container.

Inside the `/src/app/` folder, create a file `dependencies.ts`, and copy the following code:

```typescript
import {FakeAuthApi, IAuthApi} from "../features/auth/data/services/auth-api";
import {ILocalStorage, LocalStorage} from "../features/auth/data/services/local-storage";
import IAuthRepository, {AuthRepository} from "../features/auth/data/auth-repository";

// Instantiate an auth repository with its dependencies
const authApi: IAuthApi = new FakeAuthApi();
const localStorage: ILocalStorage = new LocalStorage();
const authRepo: IAuthRepository = new AuthRepository(authApi, localStorage);

// the object that will be injected into the store as extra arg
const storeExtraArg = {
  authRepo,
}
// also export the type of the above object for convenience
export type StoreExtraArg = typeof storeExtraArg;
```

Nothing complicated. If you want some inspiration on how to instantiate multiple dependencies, you can take a look at this [code][service-locator]. Otherwise, let's actually inject this into the store, go to `/src/app/store.ts`, and modify your `createStore` function:

```typescript
// Add getDefaultMiddleware to the existing import
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {StoreExtraArg} from "./dependencies";

...

// Add a parameter of type StoreExtraArg
const createStore = (extraArg: StoreExtraArg) => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
      // Pass that parameter as a thunk extra argument
      thunk: {extraArgument: extraArg},
    }),
  });
};
```

Now `extraArg` is available in all our async thunks, we just need to do one last tweak. Remember our `ThunkApi` type we wrote earlier, we'll add one more type to it, go back to `auth-slice.ts` and add the `extra` type:

```typescript
...
import {StoreExtraArg} from "../../app/dependencies";

...

type ThunkApi = {
  rejectValue: AuthError,
  extra: StoreExtraArg,
};
```

Let's also make our thunk's async function take the parameters we specified:

```diff
const loginWithEmailAndPass = createAsyncThunk<User, EmailPass, ThunkApi>(
  'auth/loginWithEmailAndPass',
- async () => {
+ async (emailPass, thunkAPI) => {
    // TODO: login
  }
);
```

And now our async thunk is fully typed, if your IDE has autocompletion, you can see that `authRepo` is there inside the `thunkAPI`:

![auto completion screenshot][auto-complete-screen-shot]

Last but not least, let's use `authRepo` to sign the user in, here's the final version of `loginWithEmailAndPass`:

```typescript
import {isRight} from "fp-ts/Either";

...

const loginWithEmailAndPass = createAsyncThunk<User, EmailPass, ThunkApi>(
  'auth/loginWithEmailAndPass',
  async (emailPass, thunkAPI) => {
    // Make the api call
    const result = await thunkAPI.extra.authRepo.signInWithEmailAndPassword(emailPass);
    // If the login succeeds, return the User
    if (isRight(result)) {
      return result.right;
    }
    // If the login fails, reject with the AuthError
    return thunkAPI.rejectWithValue(result.left);
  }
);
```

You may be confused about `isRight`, but it's really simple. The `authRepo` returns `Promise<Either<AuthError, User>>`. The `Either` type can either be `Left` or `Right`. If it's `Left`, we know that it's an `AuthError`, else it's a `User`. We're doing this because we want to catch all exceptions in the repository, and then return regular objects. It's better than writing `try...catch` blocks everywhere. If you want to learn more about the Repository pattern, you can check my article [here][repository-article].

# Reducers

As you may recall from earlier, the thunk middleware will dispatch actions depending on the return value of the underlying async function. We didn't write any code that will handle these actions, let's do that now. Add the `extraReducers` to the `authSlice` as follows:

```typescript
const authSlice = createSlice({
  name: 'auth',
  reducers: {},
  initialState,
  extraReducers: builder => {
    builder
      .addCase(loginWithEmailAndPass.pending, state => {
        // Login started
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithEmailAndPass.fulfilled, (state, action) => {
        // Login succeeded
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(loginWithEmailAndPass.rejected, (state, action) => {
        // Login failed
        if (action.payload == undefined)
          state.error = AuthError.general;
        else
          state.error = action.payload;
        state.loading = false;
      });
  }
});
```

We just added extra reducers to handle actions coming from `loginWithEmailAndPass` async thunk:

* The pending case: The API call is being made, we reset the previous `error`, and set `loading` to true.
* The fulfilled case: The API call was successful, and we got our user object. Save that user in the state and reset `loading` back to false.
* The rejected case: Some `error` happened while making the API call, save that error in the state, and reset `loading` back to false.

We used the `builder` syntax to make our reducers typed. If we used a simple object as the value for `extraReducers`, the `state` and `action` objects inside the reducer functions won't be typed.

Let's export the async thunk, as well as the main authentication reducer.

```typescript
export const authActions = {loginWithEmailAndPass};
export default authSlice.reducer;
```

And finally, let's add the exported reducer to the store, go to `/src/app/store.ts`, and add it:

```typescript
...
import authReducer from "../features/auth/auth-slice";

const rootReducer = combineReducers({
  auth: authReducer,
});
...
```

# Hooking redux to the components

We will use a provider on the top of the component tree to make the redux store accessible to all components. The components also need access to actions so they can dispatch them to the store, so we will provide them too using the Context API.

### Custom redux hooks

`react-redux` library has some useful hooks to access the Redux API. Namely `useDispatch` and `useSelector`. These hooks are not typed, we could import `AppState` and `AppDispatch` and make them typed, but since we'll be doing it inside many components, it's better to create custom typed versions of these hooks, and use them instead. Create a file under `/src/app/` and call it `redux-hooks.ts`, and add the following hooks to it:

```typescript
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppState} from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
```

### Auth actions

Create a file under `/src/auth/` called `auth-actions-context.tsx`, and copy the following code:

```typescript
import React, {useContext} from "react";
import {authActions} from "./auth-slice";

export const AuthActionsContext = React.createContext(authActions);

export const useAuthActions = () => useContext(AuthActionsContext);

const AuthActionsProvider = ({children}: { children: React.ReactNode }) => {
  return (
    <AuthActionsContext.Provider value={authActions}>
      {children}
    </AuthActionsContext.Provider>
  );
};

export default AuthActionsProvider;
```

We'll be using `useAuthActions` hook instead of using `useContext` and `AuthActionsContext` every time. The `AuthActionsProvider` is there for the same purpose.

### Instantiating the store

Let's instantiate a store, go to `/src/app/dependencies.ts` and add the following code:

```typescript
import createStore from "./store";

...

export const store = createStore(storeExtraArg);
```

### Providing the store

Go to `/src/index.tsx`, and provide the store/actions:

```typescript
...
import {Provider} from "react-redux";
import AuthActionsProvider from "./features/auth/auth-actions-context";
import {store} from "./app/dependencies";

ReactDOM.render(
  <Provider store={store}>
    <AuthActionsProvider>
      <MuiThemeProvider theme={theme}>
        <App/>
      </MuiThemeProvider>
    </AuthActionsProvider>
  </Provider>,
  document.getElementById('root')
);
```

### Hooking the App component

Head to `/src/app/app.tsx`, you'll notice we are using a `user` variable which is always `null`, and we use it to conditionally render `LoginPage`/`LoggedInPage`. We need to use the store's state to decide which page to render.

We'll be using the `useAppSelector` hook to access the state of the store we provided earlier, modify `app.tsx` as follows:

```typescript
...
import {useAppSelector} from "./redux-hooks";

const App = () => {
  const user = useAppSelector(state => state.auth.currentUser);

  return user != null ? <LoggedInPage/> : <LoginPage/>;
};

export default App;
```

To make sure everything works, run `npm start`. You should still see the login page, because the user is initially `null`.

### The Login page

Head to `/src/features/auth/ui/login-page.tsx`, it has many lines of code as you can see, but we're only interested in the `loginClicked` callback. It's fired when the user clicks the login button. For now, it only validates the email and password, then returns. Instead of just returning, let's actually log the user in.

First, let's grab the `dispatch` method, and our `loginWithEmailAndPass` action. Import `useAppDispatch` and `useAuthActions`, then add the following lines to the top of the component:

```typescript
const {loginWithEmailAndPass} = useAuthActions();
const dispatch = useAppDispatch();
```

Then, inside the `loginClicked` function, dispatch `loginWithEmailAndPass` action to the redux store:

```typescript
const loginClicked = useCallback((e: React.MouseEvent | React.FormEvent) => {
  e.preventDefault();
  if (validate()) {
    dispatch(loginWithEmailAndPass({email, password}));
  }
}, [dispatch, validate, loginWithEmailAndPass, email, password]);
```

Also, remove the hardcoded `loading` and `error` variables, and replace them with the ones existing in the auth state. Import `useAppSelector`, and grab the state variables:

```typescript
const {loading, error} = useAppSelector(state => {
  return {loading: state.auth.loading, error: state.auth.error};
});
```

That's it, refresh the page, enter an email and a password, click login, and BOOM, they're incorrect 🤣. Use the following credentials to login:

``` plain-text
Email: escanor@gmail.com
Pass: password
```

Everything is working as expected, the progress indicator shows while the API is being called, an error snackbar appears if the login failed, and the `LoggedInPage` is shown if the login succeeds.

### The LoggedIn page

Go to the `LoggedInPage` at `/src/features/auth/ui/logged-in-page.tsx`.

First of all, You'll notice that we're using a hardcoded user, let's replace it with the user in the auth state. Import `useAppSelector` and `shallowEqual`, remove the hardcoded `user` constant, and grab the actual user:

```typescript
const user = useAppSelector(state => state.auth.currentUser, shallowEqual);
```

You will get a compile time error saying that `user` can be null. This is normal since it's of type `User | null`. But we are sure that `user` is never `null` if the `LoggedInPage` is being displayed (Remember the conditional render in `app.tsx`?). So it's safe to just throw an error if this ever happens:

```typescript
const LoggedInPage = () => {
  const user = useAppSelector(state => state.auth.currentUser, shallowEqual);

  ...

  if (user == null) {
    // This should never happen
    throw new Error('Displaying the LoggedInPage without a logged in user');
  }

  return (
  ...
};
```

Now login, and everything should work as expected.

Second of all, the logout button doesn't do anything. Let's change that.

# Logging out

In the same way I implemented `loginWithEmailAndPass` async thunk, I'll also implement `logout`. Check out the final `auth-slice.ts` in this [gist][auth-slice-gist].

In the `LoggedInPage`, import `useAuthActions` and `useAppDispatch`, and dispatch the `logout` action when the logout button is clicked:

```typescript
const dispatch = useAppDispatch();
const {logout} = useAuthActions();

const logoutClicked = useCallback(() => {
  dispatch(logout());
}, [dispatch, logout]);
```

Check out this [gist][logged-in-page-gist] for the final `LoggedInPage`.

Now login, click the logout button, and you should be logged out.

# Testing

I promised that everything will be tested, but this article is already long enough. So, I'll leave testing to the next one, and will link it here once it's done.

# Homework

It will be nice if the user can stay logged in after closing or refreshing the page, which is currently unsupported. Try to add this functionality to the app. You only have to add redux + component logic, the persisting is already done for you. You can just call `authRepo.getCurrentUser()`, and it will return a `User | null` depending on whether the user is logged in or not. Good luck!

# Conclusion

This was a long tutorial, I hope it wasn't that confusing, and you actually learned something from it 😅. Let's recap all we've done so far:

* We created an authentication `Slice` that contains everything related to the authentication state of our app.
* We wrote `Async Thunks` that manipulate the state asynchronously.
* We injected dependencies to the `Store`, so we can access them in all our `Async Thunks`.
* We made sure to fully benefit from the type system.
* No hard dependencies, everything is injected/provided.

You can find the final code in this [GitHub Repo][final-repo].

I hope you had a good read, see you in the next 👋.
![bye][bye]

[rtk-tutorial]:https://redux-toolkit.js.org/tutorials/typescript

[redux-toolkit]:https://github.com/reduxjs/redux-toolkit#redux-toolkit

[slice-docs]:https://github.com/reduxjs/redux-toolkit/blob/e85eb17b39a2118d859f7b7746e0f3fee523e089/docs/tutorials/intermediate-tutorial.md#understanding-slices

[redux-thunk]:https://github.com/reduxjs/redux-thunk#redux-thunk

[service-locator]:https://github.com/aouahib/very_good_chat_web/blob/main/src/injection/service-locator.ts

[repository-article]:https://dev.to/aouahib/the-repository-pattern-with-typescript-3ibn

[end-result-gif]:https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nhbw8igi9cgcjnfaah4b.gif

[auto-complete-screen-shot]:https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j5b2f6vkra4a54m465zz.png

[auth-slice-gist]:https://gist.github.com/aouahib/b63e53d71e2c9d77fefa5d2df6723c92#file-auth-slice-tsx

[logged-in-page-gist]:https://gist.github.com/aouahib/b065bd9f691a617a0c3ecbabb41e9ff7

[final-repo]:https://github.com/aouahib/redux_app_final

[bye]:https://media.giphy.com/media/ZCTZKfNl6ABGdqRCBR/giphy.gif