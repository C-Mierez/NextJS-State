import {
    useState,
    useMemo,
    createContext,
    useContext,
    ReactElement,
} from "react";
import constants from "../public/constants";

interface Pokemon {
    id: number;
    name: string;
    image: string;
}

export async function getServerSideProps() {
    const resp = await fetch(constants.API.index);
    return {
        props: {
            pokemon: await resp.json(),
        },
    };
}

const usePokemonController = (pokemon: Pokemon[]) => {
    const [filter, setFilter] = useState("");

    const filteredPokemon = useMemo(
        () =>
            pokemon.filter((p) =>
                p.name.toLowerCase().includes(filter.toLowerCase())
            ),
        [filter, pokemon]
    );

    return {
        filter,
        setFilter,
        pokemon: filteredPokemon,
    };
};

const PokemonContext = createContext<ReturnType<typeof usePokemonController>>({
    filter: "",
    setFilter: () => {},
    pokemon: [],
});

export const PokemonProvider = ({
    pokemon,
    children,
}: {
    pokemon: Pokemon[];
    children: ReactElement;
}) => (
    <PokemonContext.Provider value={usePokemonController(pokemon)}>
        {children}
    </PokemonContext.Provider>
);

export const usePokemon = () => useContext(PokemonContext);
