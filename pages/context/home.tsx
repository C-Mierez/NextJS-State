import Head from "next/head";
import { ReactElement, useMemo, useState } from "react";
import PreviewCard from "../../components/PreviewCard";
import { Pokemon } from "../../model/Pokemon";
import css from "../../styles/Home.module.css";
import { PokemonProvider, usePokemon } from "../../src/store";

export { getServerSideProps } from "../../src/store";

export default function ContextHome() {
    const { filter, pokemon, setFilter } = usePokemon();

    return (
        <>
            <Head>
                <title>useState</title>
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
}

// This is mainly just done here so as to not interfere with other state management solutions
ContextHome.getLayout = function getLayout(page: ReactElement, pageProps: any) {
    return (
        <PokemonProvider pokemon={pageProps.pokemon}>{page}</PokemonProvider>
    );
};
