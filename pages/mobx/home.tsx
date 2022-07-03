import type { GetServerSideProps } from "next";
import Head from "next/head";
import PreviewCard from "../../components/PreviewCard";
import { Pokemon } from "../../model/Pokemon";
import { constants } from "../../public/constants";
import css from "../../styles/Home.module.css";
import { useMemo, useState, useEffect } from "react";
import store from "../../src/mobx/store";
import { observer } from "mobx-react-lite";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const resp = await fetch(constants.API.index);

    store.pokemon = await resp.json();

    return {
        props: {
            initialPokemon: store.pokemon,
        },
    };
};

const MobXHome = ({ initialPokemon }: { initialPokemon: Pokemon[] }) => {
    useEffect(() => {
        store.pokemon = initialPokemon;
    }, [initialPokemon]);

    return (
        <>
            <Head>
                <title>MobX</title>
            </Head>
            <div className={css.searchBar}>
                <input
                    className={css.bar}
                    type={"text"}
                    value={store.filter}
                    onChange={(e) => {
                        store.filter = e.target.value;
                    }}
                ></input>
            </div>
            <div className={css.card_grid}>
                {store.filteredPokemon.slice(0, 20).map((pokemon, index) => {
                    return <PreviewCard key={index} pokemon={pokemon} />;
                })}
            </div>
        </>
    );
};

export default observer(MobXHome);
