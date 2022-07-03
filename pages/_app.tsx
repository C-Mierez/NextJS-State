import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import css from "../styles/Layout.module.css";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement, pageProps: any) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page, pageProps) => page);
    console.log(getLayout);
    return (
        <>
            <Header></Header>
            <div className={css.body}>
                {getLayout(<Component {...pageProps} />, pageProps)}
            </div>
        </>
    );
}

export default MyApp;
