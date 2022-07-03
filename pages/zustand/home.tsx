import type { GetServerSideProps } from "next";
import Head from "next/head";
import PreviewCard from "../../components/PreviewCard";
import { Pokemon } from "../../model/Pokemon";
import { constants } from "../../public/constants";
import css from "../../styles/Home.module.css";
import { useMemo, useState } from "react";
import create from "zustand";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const resp = await fetch(constants.API.index);

    usePokemonStore.getState().setPokemon(await resp.json());

    return {
        props: {
            pokemon: usePokemonStore.getState().pokemon,
        },
    };
};

const usePokemonStore = create<{
    pokemon: Pokemon[];
    setPokemon: (pokemon: Pokemon[]) => void;
    filteredPokemon: Pokemon[];
    filter: string;
    setFilter: (filter: string) => void;
}>((set) => ({
    pokemon: [],
    setPokemon: (pokemon: Pokemon[]) =>
        set({ pokemon, filteredPokemon: pokemon }),
    filteredPokemon: [],
    filter: "",
    setFilter: (filter: string) =>
        set((state) => ({
            filter: filter,
            filteredPokemon: state.pokemon.filter((p) =>
                p.name.toLowerCase().includes(filter.toLowerCase())
            ),
        })),
}));

const ZustandHome = ({ pokemon }: { pokemon: Pokemon[] }) => {
    const { filter, filteredPokemon, setFilter } = usePokemonStore();

    return (
        <>
            <Head>
                <title>Zustand</title>
            </Head>
            <div className={css.searchBar}>
                <input
                    className={css.bar}
                    type={"text"}
                    value={filter}
                    onChange={(e) => {
                        setFilter(e.target.value);
                    }}
                ></input>
            </div>
            <div className={css.card_grid}>
                {filteredPokemon.slice(0, 20).map((pokemon, index) => {
                    return <PreviewCard key={index} pokemon={pokemon} />;
                })}
            </div>
        </>
    );
};

export default ZustandHome;
