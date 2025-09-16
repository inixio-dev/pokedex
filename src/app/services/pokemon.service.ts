import axios from "axios";
import type {
  EvolutionChainStepDTO,
  PokemonDTO,
  PokemonListItemDTO,
  SpeciesDTO,
} from "../../data/dtos/Pokemon.dto";

export class PokemonService {
  private static pokemonIndex: PokemonListItemDTO[] = [];

  private static readonly pokeApiUrl = "https://pokeapi.co/api/v2";

  private static async loadPokemonIndex() {
    if (this.pokemonIndex.length > 0) {
      return;
    }
    const pokeRes = await axios.get(`${this.pokeApiUrl}/pokemon?limit=10000`);
    this.pokemonIndex = pokeRes.data.results;
  }

  static getTotalPokemons() {
    return this.pokemonIndex.length;
  }

  static async findByName(
    name: string,
    limit = 2,
    offset = 0,
  ): Promise<PokemonDTO[]> {
    await this.loadPokemonIndex();
    const matchAll = this.pokemonIndex.filter(
      (p) =>
        name === "" ||
        p.name.toLowerCase() === name.toLowerCase() ||
        p.name.toLowerCase().includes(name.toLowerCase()),
    );
    const match = matchAll.slice(0, limit);
    const data = await this.getBatch(match.map((item) => item.name));
    const dictionary = new Set(data.map((p) => p.id));
    const evolutions: PokemonDTO[] = [];
    for (const pokemon of data) {
      let evolutionChain: PokemonDTO[] = (await this.getPokemonEvolutionChain(
        pokemon,
        true,
      )) as PokemonDTO[];
      evolutionChain = evolutionChain.filter((e) => !dictionary.has(e.id));
      evolutions.push(...evolutionChain);
      evolutionChain.forEach((e) => dictionary.add(e.id));
    }
    return [...data, ...evolutions].sort((a, b) => a.id - b.id).slice(0, limit);
  }

  static async getTypes() {
    const typesRes = await axios.get(`${this.pokeApiUrl}/type?limit=30`);
    return typesRes.data.results;
  }

  static async getGenerations() {
    const typesRes = await axios.get(`${this.pokeApiUrl}/generation`);
    return typesRes.data.results;
  }

  static getGeneration(pokemon: PokemonDTO) {
    if (!pokemon || !pokemon.sprites.versions) {
      return "unknown";
    }
    const generation = Object.keys(pokemon.sprites.versions).find((v) => {
      if (!pokemon.sprites.versions) {
        return "unknown";
      }
      const games = pokemon.sprites.versions[v]
        ? Object.keys(pokemon.sprites.versions[v])
        : [];
      const inGame = games.find(
        (g) => pokemon.sprites.versions?.[v]?.[g]?.front_default !== null,
      );
      if (inGame) {
        return v;
      }
      return "unknown";
    });
    return generation || "unknown";
  }

  static async getPokemonDetail(id: string) {
    try {
      const pokeRes = await axios.get(`${this.pokeApiUrl}/pokemon/${id}`);
      return pokeRes.data;
    } catch (e) {
      console.error("Error fetching pokemon detail", e);
    }
  }

  static async getPokemonEvolutionChain(
    pokemon: PokemonDTO,
    fetchFullData = false,
  ) {
    const speciesRes = await axios.get(pokemon.species.url);
    const species = speciesRes.data;
    const evolutionChainRes = await axios.get(species.evolution_chain.url);
    const evolutionChainTree = evolutionChainRes.data;
    const evolutionChain = this.flattenChain(evolutionChainTree.chain);
    if (fetchFullData) {
      return await this.getBatch(
        evolutionChain.map((ec: SpeciesDTO) => ec.name),
      );
    }
    return evolutionChain;
  }

  private static flattenChain(
    evolutionChain?: EvolutionChainStepDTO,
    flatChain: SpeciesDTO[] = [],
  ): SpeciesDTO[] {
    if (!evolutionChain) {
      return flatChain;
    }
    const newArray = [...flatChain, evolutionChain.species];
    if (evolutionChain.evolves_to?.length === 0) {
      return newArray;
    } else {
      return this.flattenChain(evolutionChain.evolves_to[0], newArray);
    }
  }

  private static async getBatch(ids: string[]): Promise<PokemonDTO[]> {
    return (
      await Promise.all(ids.map((id) => this.getPokemonDetail(id)))
    ).filter((p): p is PokemonDTO => !!p);
  }
}
