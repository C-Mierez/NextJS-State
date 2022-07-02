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