import { createAsyncThunk } from "@reduxjs/toolkit";
import constants from "../../../public/constants";

export const getPokemonThunk = createAsyncThunk(
    "pokemon/getPokemonThunk",
    async () => {
        const response = await fetch(constants.API.index);
        return await response.json();
    }
);
