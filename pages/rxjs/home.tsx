import type { GetServerSideProps } from "next";
import Head from "next/head";
import PreviewCard from "../../components/PreviewCard";
import { Pokemon } from "../../model/Pokemon";
import { constants } from "../../public/constants";
import css from "../../styles/Home.module.css";
import { useMemo, useState, useEffect } from "react";
import { BehaviorSubject } from "rxjs";
import { useObservableState } from "observable-hooks";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const resp = await fetch(constants.API.index);

    pokemon$.next(await resp.json());

    return {
        props: {
            initialPokemon: pokemon$.value,
        },
    };
};

const pokemon$ = new BehaviorSubject<Pokemon[]>([]);
const filter$ = new BehaviorSubject<string>("");

const RxJSHome = ({ initialPokemon }: { initialPokemon: Pokemon[] }) => {
    useEffect(() => {
        pokemon$.next(initialPokemon);
    }, [initialPokemon]);

    const pokemon = useObservableState(pokemon$);
    const filter = useObservableState(filter$);

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
                <title>RxJS</title>
            </Head>
            <div className={css.searchBar}>
                <input
                    className={css.bar}
                    type={"text"}
                    value={filter$.value}
                    onChange={(e) => {
                        filter$.next(e.target.value);
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

export default RxJSHome;
