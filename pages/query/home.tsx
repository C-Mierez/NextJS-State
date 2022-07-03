import type { GetServerSideProps } from "next";
import Head from "next/head";
import PreviewCard from "../../components/PreviewCard";
import { Pokemon } from "../../model/Pokemon";
import { constants } from "../../public/constants";
import css from "../../styles/Home.module.css";
import { ReactElement, useMemo, useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            initialPokemon: await fetchPokemon(),
        },
    };
};

const fetchPokemon = (): Promise<Pokemon[]> => {
    return fetch(constants.API.index).then((resp) => resp.json());
};

export default function QueryHome({
    initialPokemon,
}: {
    initialPokemon: Pokemon[];
}) {
    const {
        isLoading,
        error,
        data: pokemon,
    } = useQuery("pokemon", fetchPokemon, {
        initialData: initialPokemon,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    const [filter, setFilter] = useState("");

    const filteredPokemon = useMemo(
        () =>
            pokemon!.filter((p) =>
                p.name.toLowerCase().includes(filter.toLowerCase())
            ),
        [filter, pokemon!]
    );

    return (
        <>
            <Head>
                <title>React Query</title>
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
}

// This is mainly just done here so as to not interfere with other state management solutions
QueryHome.getLayout = function getLayout(page: ReactElement, pageProps: any) {
    /* eslint-disable */
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>{page}</QueryClientProvider>
    );
};
