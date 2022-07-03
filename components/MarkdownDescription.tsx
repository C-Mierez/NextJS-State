import ReactMarkdown from "react-markdown";
import css from "../styles/Markdown.module.css";
import MarkdownHeader from "./MarkdownHeader";
import { SyntheticEvent, useState } from "react";

export default function MarkdownDescription({
    markdown,
}: {
    markdown: string;
}) {
    console.log("RENDERED MARKDOWN DESCRIPTION");
    const [isExpanded, setIsExpanded] = useState(false);
    const [readmeHeight, setReadmeHeight] = useState("4000px");

    const expandedStyle = isExpanded
        ? { maxHeight: readmeHeight }
        : { maxHeight: "100px", filter: "blur(0.4rem)" };

    const onClick = () => {
        setIsExpanded(!isExpanded);
    };

    const onLoad = (e: SyntheticEvent<HTMLDivElement, Event>) => {
        setReadmeHeight(e.currentTarget.clientHeight.toString() + "px");
    };

    return (
        <>
            <MarkdownHeader onClick={onClick}></MarkdownHeader>
            <div className={css.readme} style={expandedStyle} onLoad={onLoad}>
                <ReactMarkdown className={css.markdown_body}>
                    {markdown}
                </ReactMarkdown>
            </div>
        </>
    );
}
