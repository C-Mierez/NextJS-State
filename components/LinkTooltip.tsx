import css from "../styles/Index.module.css";

interface Props {
    tooltip: string;
}

export default function LinkTooltip(props: Props) {
    return (
        <>
            <div className={css.tooltip}>
                {props.tooltip}I was going to do a tooltip but I'm too lazy now
                <br />
                😄
            </div>
        </>
    );
}
