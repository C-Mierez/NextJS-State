import { Pokemon } from "../../../model/Pokemon";
import { pokemonSlice } from "./pokemonSlice";

export type PokemonState = {
    pokemon: Pokemon[];
    filter: string;
    filteredPokemon: Pokemon[];
    pending: boolean;
    error: boolean;
};

export const initialState: PokemonState = {
    pokemon: [],
    filter: "",
    filteredPokemon: [],
    pending: false,
    error: false,
};
