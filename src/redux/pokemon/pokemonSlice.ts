import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState, PokemonState } from "./state";
import { getPokemonThunk } from "./actions";
import { RootState } from "../store";

export const pokemonSlice = createSlice({
    name: "pokemon",
    initialState: initialState,
    reducers: {
        rehydrate(state: PokemonState, action: PayloadAction<PokemonState>) {
            state.pokemon = action.payload.pokemon;
            state.filter = action.payload.filter;
            state.filteredPokemon = action.payload.filteredPokemon;
            state.pending = action.payload.pending;
            state.error = action.payload.error;
        },
        setSearch(state: PokemonState, action: PayloadAction<string>) {
            state.filter = action.payload;
            state.filteredPokemon = state.pokemon.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(state.filter.toLowerCase())
            );
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPokemonThunk.pending, (state) => {
            state.pending = true;
        });
        builder.addCase(getPokemonThunk.fulfilled, (state, action) => {
            state.pending = false;
            state.pokemon = action.payload;
            state.filteredPokemon = action.payload;
        });
        builder.addCase(getPokemonThunk.rejected, (state) => {
            state.pending = false;
            state.error = true;
        });
    },
});

export const { rehydrate, setSearch } = pokemonSlice.actions;

export const selectFilter = (state: RootState) => state.pokemon.filter;
export const selectFilteredPokemon = (state: RootState) =>
    state.pokemon.filteredPokemon;
