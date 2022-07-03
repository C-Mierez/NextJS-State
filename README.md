# NextJS State Management 

Quick general project featuring multiple packages and approaches to state management in a React - NextJS project.

---
The starting project is just a site with a bunch of different Pokemon fetched from an endpoint (SSR).

The objective is to create a simple Search Bar to search for a specific Pokemon.

- [NextJS State Management](#nextjs-state-management)
    - [useState](#usestate)
    - [Context](#context)
    - [React Query](#react-query)
 
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

### Redux