import type {
    GetServerSideProps,
    InferGetServerSidePropsType,
    NextPage,
} from "next";
import Head from "next/head";
import PreviewCard from "../../components/PreviewCard";
import { constants } from "../../public/constants";
import css from "../../styles/Home.module.css";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const resp = await fetch(constants.API.index);

    return {
        props: {
            pokemon: await resp.json(),
        },
    };
};

const UseStateHome: NextPage = ({
    pokemon,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            <Head>
                <title>useState</title>
            </Head>
            <div className={css.card_grid}>
                {(pokemon as Array<any>).slice(0, 20).map((pokemon, index) => {
                    return <PreviewCard key={index} pokemon={pokemon} />;
                })}
            </div>
        </>
    );
};

export default UseStateHome;
