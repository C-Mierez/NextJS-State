import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import css from "../styles/Index.module.css";

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>NextJS State</title>
            </Head>
            <div className={css.main}>
                <Link href={"/home/"}>
                    <div className={css.jump}>No State</div>
                </Link>
                <Link href={"/use-state/home/"}>
                    <div className={css.jump}>useState</div>
                </Link>
                <Link href={"/context/home/"}>
                    <div className={css.jump}>Context</div>
                </Link>
                <Link href={"/query/home/"}>
                    <div className={css.jump}>React Query</div>
                </Link>
                <Link href={"/query-hydrate/home/"}>
                    <div className={css.jump}>React Query Hydrate</div>
                </Link>
                <Link href={"/redux/home/"}>
                    <div className={css.jump}>Redux 😄</div>
                </Link>
                <Link href={"/zustand/home/"}>
                    <div className={css.jump}>Zustand</div>
                </Link>
            </div>
        </>
    );
};

export default Index;
