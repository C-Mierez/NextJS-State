import css from "../styles/Index.module.css";

interface Props {
    tooltip: string;
}

export default function LinkTooltip(props: Props) {
    return (
        <>
            <div className={css.tooltip}>
                I was going to do a tooltip but I am too lazy now
                <br />
                😄
            </div>
        </>
    );
}
