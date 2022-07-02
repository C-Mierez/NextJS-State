import Link from "next/link";
import { Pokemon } from "../model/Pokemon";
import constants from "../public/constants";
import css from "../styles/PreviewCard.module.css";

interface Props {
    pokemon: Pokemon;
}

export default function PreviewCard({ pokemon }: Props) {
    const baseUrl = constants.API.base;

    return (
        <div className={css.preview_card}>
            <div className={css.details}>
                <div className={css.name}>{pokemon.name}</div>
                <div className={css.id}>#{pokemon.id}</div>
            </div>
            <img src={`${baseUrl}${pokemon.image}`} alt="Image"></img>
        </div>
    );
}
