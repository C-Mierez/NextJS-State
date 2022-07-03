import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import MarkdownDescription from "../components/MarkdownDescription";
import css from "../styles/Index.module.css";
import fs from "fs";
import PageLink from "../components/PageLink";

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
    // const tooltips = markdown
    //     .split("###")
    //     .map((s) => s.slice(s.indexOf("\n\r")));

    return (
        <>
            <Head>
                <title>NextJS State</title>
            </Head>
            <MarkdownDescription markdown={markdown}></MarkdownDescription>
            <div className={css.main}>
                <PageLink href={"/home/"} title={"No State"} tooltip={""} />
                <PageLink
                    href={"/use-state/home/"}
                    title={"useState"}
                    tooltip={""}
                />

                <PageLink
                    href={"/context/home/"}
                    title={"Context"}
                    tooltip={""}
                />

                <PageLink
                    href={"/query/home/"}
                    title={"React Query"}
                    tooltip={""}
                />

                <PageLink
                    href={"/query-hydrate/home/"}
                    title={"React Query Hydrate"}
                    tooltip={""}
                />

                <PageLink href={"/redux/home/"} title={"Redux"} tooltip={""} />

                <PageLink
                    href={"/zustand/home/"}
                    title={"Zustand"}
                    description={"actually amazing wtf?"}
                    tooltip={""}
                />

                <PageLink href={"/mobx/home/"} title={"MobX"} tooltip={""} />

                <PageLink
                    href={"/jotai/home/"}
                    title={"Jotai"}
                    description={"also fcking amazing???"}
                    tooltip={""}
                />

                <PageLink href={"/rxjs/home/"} title={"RxJS"} tooltip={""} />
            </div>
        </>
    );
};

export default Index;
