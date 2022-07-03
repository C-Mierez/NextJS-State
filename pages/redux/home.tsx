import { GetServerSideProps } from "next";
import Head from "next/head";
import { ReactElement, useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import PreviewCard from "../../components/PreviewCard";
import { getPokemonThunk } from "../../src/redux/pokemon/actions";
import {
    rehydrate,
    selectFilter,
    selectFilteredPokemon,
    setSearch,
} from "../../src/redux/pokemon/pokemonSlice";
import { store } from "../../src/redux/store";
import css from "../../styles/Home.module.css";

export const getServerSideProps: GetServerSideProps = async (context) => {
    await store.dispatch(getPokemonThunk());

    return {
        props: {
            initialState: store.getState(),
        },
    };
};

export default function ReduxtHome({ initialState }: any) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(rehydrate(initialState.pokemon));
    }, [dispatch, initialState]);

    const pokemon = useSelector(selectFilteredPokemon);
    const filter = useSelector(selectFilter);

    return (
        <>
            <Head>
                <title>Redux</title>
            </Head>
            <div className={css.searchBar}>
                <input
                    className={css.bar}
                    type={"text"}
                    value={filter}
                    onChange={(e) => {
                        dispatch(setSearch(e.target.value));
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
ReduxtHome.getLayout = function getLayout(page: ReactElement, pageProps: any) {
    return <Provider store={store}>{page}</Provider>;
};
