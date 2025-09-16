export interface PokemonDTO {
  id: number;
  name: string;
  sprites: {
    front_default?: string | undefined;
    front_shiny?: string | undefined;
    versions?: any | undefined;
    [key: string]: string | undefined;
  };
  species: {
    name: string;
    url: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  evolutionChain: EvolutionChainStepDTO[];
}

export interface PokemonListItemDTO {
  name: string;
  url: string;
}

export interface TypeDTO {
  name: string;
  selected?: boolean;
}

export interface GenerationDTO {
  name: string;
  selected?: boolean;
}

export interface EvolutionChainStepDTO {
  species: SpeciesDTO;
  name: string;
  evolves_to: EvolutionChainStepDTO[];
}

export interface SpeciesDTO {
  id: string;
  name: string;
  url: string;
}

export interface PokemonListResponseDTO {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItemDTO[];
}
