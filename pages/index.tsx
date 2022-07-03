import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import MarkdownDescription from "../components/MarkdownDescription";
import css from "../styles/Index.module.css";
import fs from "fs";

// Fetch the README.md content because Im bored and want to show it on the website
export const getStaticProps: GetStaticProps = () => {
    const rawReadme = fs.readFileSync(`${process.cwd()}/README.md`, "utf-8");

    return {
        props: {
            markdown: rawReadme,
        },
    };
};

const Index = ({ markdown }: { markdown: string }) => {
    return (
        <>
            <Head>
                <title>NextJS State</title>
            </Head>
            <MarkdownDescription markdown={markdown}></MarkdownDescription>
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
                    <div className={css.jump}>Redux</div>
                </Link>
                <Link href={"/zustand/home/"}>
                    <div className={css.jump}>
                        Zustand
                        <div>actually amazing wtf?</div>
                    </div>
                </Link>
                <Link href={"/mobx/home/"}>
                    <div className={css.jump}>MobX</div>
                </Link>
                <Link href={"/jotai/home/"}>
                    <div className={css.jump}>
                        Jotai<div>also fcking amazing???</div>
                    </div>
                </Link>
                <Link href={"/rxjs/home/"}>
                    <div className={css.jump}>RxJS</div>
                </Link>
            </div>
        </>
    );
};

export default Index;
