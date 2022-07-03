import Link from "next/link";
import css from "../styles/Index.module.css";
import { useState } from "react";
import LinkTooltip from "./LinkTooltip";

interface Props {
    href: string;
    title: string;
    description?: string;
    tooltip: string;
}

export default function PageLink(props: Props) {
    const [isOverJump, setIsOverJump] = useState(false);
    const [isOverTooltip, setIsOverTooltip] = useState(false);

    const onMouseEnterJump = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        setIsOverJump(true);
    };
    const onMouseLeaveJump = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        setIsOverJump(false);
    };
    const onMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsOverTooltip(true);
    };
    const onMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsOverTooltip(false);
    };

    return (
        <Link href={props.href}>
            <div
                className={css.jump}
                onMouseEnter={onMouseEnterJump}
                onMouseLeave={onMouseLeaveJump}
            >
                {props.title}
                {props.description ? <div>{props.description}</div> : <></>}
                {isOverJump ? (
                    <div
                        className={css.tooltip_button}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        <svg
                            version="1.1"
                            id="Capa_1"
                            x="0px"
                            y="0px"
                            viewBox="0 0 32 32"
                        >
                            <g>
                                <g id="question_x5F_mark">
                                    <g>
                                        <path d="M17.6,30c0,1.102-0.895,2-2,2s-2-0.898-2-2c0-1.109,0.895-2,2-2S17.6,28.891,17.6,30z" />
                                        <path
                                            d="M15.676,25.977c-1.336,0-2.59-0.523-3.535-1.469c-0.945-1.105-1.465-2.359-1.465-3.695
				s0.52-2.59,1.465-3.371l6.688-6.688C19.584,9.996,20,8.992,20,7.926c0-1.07-0.416-2.074-1.172-2.828
				c-1.559-1.559-4.096-1.562-5.654,0C12.416,5.852,12,6.855,12,7.926H8c0-2.137,0.834-4.148,2.348-5.66
				c3.02-3.023,8.285-3.02,11.309,0.004C23.168,3.777,24,5.785,24,7.926c0,2.137-0.832,4.145-2.344,5.656l-6.688,6.523
				c-0.389,0.391-0.389,1.023,0,1.414c0.391,0.391,1.023,0.391,1.414,0c0.254-0.258,0.293-0.555,0.293-0.711h4
				c0,1.336-0.52,2.594-1.465,3.699C18.266,25.453,17.012,25.977,15.676,25.977L15.676,25.977z"
                                        />
                                    </g>
                                </g>
                            </g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                        </svg>
                        {isOverTooltip ? (
                            <LinkTooltip tooltip={props.tooltip} />
                        ) : (
                            <></>
                        )}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </Link>
    );
}
