# NextJS State Management 

Quick general project featuring multiple packages and approaches to state management in a React - NextJS project.

---
The starting project is just a site with a bunch of different Pokemon fetched from an endpoint (SSR).

The objective is to create a simple Search Bar to search for a specific Pokemon.
 
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

