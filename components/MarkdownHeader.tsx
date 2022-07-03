import css from "../styles/Markdown.module.css";

interface Props {
    onClick: () => void;
}

export default function MarkdownHeader(props: Props) {
    return (
        <>
            <div className={css.header}>
                <div className={css.details}>
                    <div className={css.brief}>
                        A simple state management project.
                    </div>
                    <a
                        href={"https://github.com/C-Mierez/NextJS-State"}
                        target={"_blank"}
                        rel="noreferrer"
                        className={css.github}
                    >
                        Check out on Github
                    </a>
                </div>
                <div className={css.description}>
                    Each of the buttons below point to a new page. All of them
                    fetch and store (SSR) data about 800+ Pokemon from a remote
                    API. However, each one of them uses a different state
                    management solution to access and use this data.
                    <br />
                    <br />
                    In particular, the objective is to implement a working
                    Search Bar that filters Pokemon per name.
                </div>
                <div className={css.readme_prompt} onClick={props.onClick}>
                    Click here to check out the repository README.md
                </div>
            </div>
        </>
    );
}
