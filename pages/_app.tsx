import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import css from "../styles/Layout.module.css";
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Header></Header>
            <div className={css.body}>
                <Component {...pageProps} />
            </div>
        </>
    );
}

export default MyApp;
