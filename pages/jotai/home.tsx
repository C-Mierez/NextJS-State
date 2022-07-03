import type { GetServerSideProps } from "next";
import Head from "next/head";
import PreviewCard from "../../components/PreviewCard";
import { Pokemon } from "../../model/Pokemon";
import { constants } from "../../public/constants";
import css from "../../styles/Home.module.css";
import { useMemo, useState } from "react";
import { atom, useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const resp = await fetch(constants.API.index);

    return {
        props: {
            initialPokemon: await resp.json(),
        },
    };
};

const pokemonAtom = atom<Pokemon[]>([]);
const filterAtom = atom<string>("");
const filteredPokemonAtom = atom((get) =>
    get(pokemonAtom).filter((p) =>
        p.name.toLowerCase().includes(get(filterAtom).toLowerCase())
    )
);

const JotaiHome = ({ initialPokemon }: { initialPokemon: Pokemon[] }) => {
    useHydrateAtoms([[pokemonAtom, initialPokemon]] as const);

    const [pokemon] = useAtom(filteredPokemonAtom);
    const [filter, setFilter] = useAtom(filterAtom);

    return (
        <>
            <Head>
                <title>Jotai</title>
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
                {pokemon.slice(0, 20).map((pokemon, index) => {
                    return <PreviewCard key={index} pokemon={pokemon} />;
                })}
            </div>
        </>
    );
};

export default JotaiHome;
