import { computed, makeObservable, observable } from "mobx";
import { Pokemon } from "../../model/Pokemon";

export class PokemonStore {
    pokemon: Pokemon[] = [];
    filter: string = "";

    constructor() {
        makeObservable(this, {
            pokemon: observable,
            filter: observable,
            filteredPokemon: computed,
        });
    }

    setPokemon(pokemon: Pokemon[]) {
        this.pokemon = pokemon;
    }

    //? Derived value
    get filteredPokemon() {
        return this.pokemon.filter((p) =>
            p.name.toLowerCase().includes(this.filter.toLowerCase())
        );
    }
}

const store = new PokemonStore();

export default store;
