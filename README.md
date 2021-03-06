# NextJS State Management 

Quick general project featuring multiple packages and approaches to state management in a React - NextJS project.

---
The starting project is just a site with a bunch of different Pokemon fetched from an endpoint (SSR).

The objective is to create a simple Search Bar to search for a specific Pokemon.

- [NextJS State Management](#nextjs-state-management)
    - [useState](#usestate)
    - [Context](#context)
    - [React Query](#react-query)
    - [Redux Toolkit](#redux-toolkit)
    - [Zustand](#zustand)
    - [MobX](#mobx)
    - [Jotai](#jotai)
    - [RxJS](#rxjs)
 
### useState

This is the most simple way of doing it.

- We use `useState` to save the current value in the search bar. 
- Whenever the search bar is updated, the current value is updated as well.
- We use `useMemo` to update the list of entries when the current value changes, using the new value to filter them. 

### Context

We take out the fetch logic from `home.tsx` so that it can be reused in a much cleaner way, and move it to  `src/store.tsx`.

Then we create a **Custom Hook** `usePokemonController` with all the filter logic like we previously had. It "hides" the original logic for a much cleaner use.

We create a new Context `PokemonContext` which is gonna be used to spread and share around the output of the previous custom hook. 

Finally we define a new Provider `PokemonProvider` that we can use to wrap the children of our React tree with this new context. This is gonna be using `usePokemonController` as a value, to spread the values down the tree.

We define a use function `usePokemon` to obtain the context `PokemonContext` from inside any child.

- To use it, wrap the tree with `PokemonProvider` and use `pageProps` to send the fetched data.
  - For this particular project, instead of wrapping the entire tree, we instead do [Per-Page Layouts](https://nextjs.org/docs/basic-features/layouts#per-page-layouts) to only create a provider for the `ContextHome` page.
- Then use the `usePokemon` hook from the page. :)

### React Query

So far both of the previous methods have been native to React. 

For React Query, an package is needed:
```bash
    yarn add react-query
```

React Query is a library that is mainly used for data fetching, though it also offers caching, synchronizing and server state management.

In this example, using it was as simple as defining a fetch function `fetchPokemon` that returns the json from the API. 

Then using the hook `useQuery` in which we define a key, the fetch function and some initial params.

Then it's just a matter of using the `data` returned by this hook instead of the previous one used for the *useMemo*.

Finally, just wrap the tree with a `QueryClientProvider` initialized with a `QueryClient`.
 
--

A better yet more complex way of using React Query is using Hydrated State.

When getting the SSR props, we instead create a new `QueryClient` from which to `prefetchQuery` the data from the endpoint. And instead of the usual return, we `dehydrate` the fetched state.

Then, it is required to wrap the tree in a `Hydrate` component that uses the `dehydratedState` from the *pageProps*. 

Data can then be accessed from the page using the same `useQuery` hook.

> The are some cool things happening here:
> - The page doesn't care about what happened. If the data was **not** prefetched, it will fetch it during the `useQuery`.
> - Doing multiple `prefetchQuery` becomes easier and cleaner, as they all get stored on the same `QueryClient`.

### Redux Toolkit

Redux is perhaps one of the approaches with the most boilerplate, but it makes for a really nice uni-directional state management solution.

Boilerplate aside, the key aspect here is that we can create a `slice` which is going to manage a `PokemonState` and is gonna have different `reducers` which are gonna be called by the components. 

In this case, since we had async data fetching, an `AsyncChunk` was created as well.

### Zustand

This is a really simple uni-directional data flow model. 

Using the `create` function, we can define a new hook `usePokemonStore` in which we define (and type) the different attributes that we need, and initialize them. Additionally we define some setter functions such as `setPokemon` or `setFilter` in which we define the logic to follow when these changes are taking place.

### MobX

This is a bi-directional data flow model. You can set the data and observe it, while also being notified when the data changes.

We create a class `PokemonStore` to be the main store. This framework's approach is much more Object-Oriented.

Making use of `makeObservable`, we define `observable` properties and `computed` properties (which are essentially derived from the others). 

And once this is done, it is just a matter of importing the store and interacting directly with it.

### Jotai

Jotai defined *Atoms* as a piece of data, that can be global or local, which we can then use granularly throughout the components.

We create a `pokemonAtom` with the `atom()` function. Then, we can *hydrate* it from inside a component using `useHydrateAtoms` hook.

Similarly, we define all other properties like `filterAtom` and `filteredPokemonAtom`, which can all be treated independently like normal. 

*However*, we can create ***dependencies*** between these atoms, and these are handled automatically. So for `filteredPokemonAtom` we define it as a function whose logic depends on getting other atoms' data, which Jotai understands as a dependency.

### RxJS

This last one is an event-driven system. We create *subjects* that are actually event streams.

We create a `pokemon$` stream using `BehaviorSubject` method and then we just push events into it using the `.next()` method.

To observe de the state we make use of `useObservableState` hook, and then proceed to use the same old *useMemo* from React.
