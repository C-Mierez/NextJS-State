import type { GetServerSideProps } from "next";
import Head from "next/head";
import PreviewCard from "../../components/PreviewCard";
import { Pokemon } from "../../model/Pokemon";
import { constants } from "../../public/constants";
import css from "../../styles/Home.module.css";
import { useMemo, useState } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const resp = await fetch(constants.API.index);

    return {
        props: {
            pokemon: await resp.json(),
        },
    };
};

const UseStateHome = ({ pokemon }: { pokemon: Pokemon[] }) => {
    const [filter, setFilter] = useState("");

    const filteredPokemon = useMemo(
        () =>
            pokemon.filter((p) =>
                p.name.toLowerCase().includes(filter.toLowerCase())
            ),
        [filter, pokemon]
    );

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
                {filteredPokemon.slice(0, 20).map((pokemon, index) => {
                    return <PreviewCard key={index} pokemon={pokemon} />;
                })}
            </div>
        </>
    );
};

export default UseStateHome;
