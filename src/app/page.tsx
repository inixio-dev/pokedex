"use client";

import { useEffect, useState } from "react";
import { PokemonService } from "./services/pokemon.service";
import { PokemonThumbnail } from "./components/PokemonThumbnail";
import FilterAccordion from "./components/FilterAccordion";
import { Loading } from "./components/Loading";
import type { GenerationDTO, PokemonDTO, TypeDTO } from "../data/dtos/Pokemon.dto";

export default function HomePage() {
  const ITEMS_PER_PAGE = 48;
  const [pokemons, setPokemons] = useState<PokemonDTO[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonDTO[]>([]);
  const [searchTerm, setSearchTerms] = useState('');
  const [types, setTypes] = useState<TypeDTO[]>([]);
  const [generations, setGenerations] = useState<GenerationDTO[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [limit, setLimit] = useState(ITEMS_PER_PAGE);


  async function onSearchChange(e: any) {
    const newSearchTerm = e.target.value;
    localStorage.setItem('searchTerm', newSearchTerm);
    setSearchTerms(newSearchTerm);
    await fetch(newSearchTerm);
  }
  
  async function fetch(searchTerm: string, limit: number = ITEMS_PER_PAGE) {
    const matchingPokemons = await PokemonService.findByName(searchTerm, limit);
    setPokemons(matchingPokemons);
    setFilteredPokemons(matchingPokemons);
    applyFilters(matchingPokemons, types, generations, searchTerm);
  }

  const applyTypesFilters = (pokemons: PokemonDTO[], types: TypeDTO[]) => {
    const typesToFilterBy = types.filter(t => t.selected).map(t => t.name);
    if (typesToFilterBy.length > 0) {
      return pokemons.filter((p: PokemonDTO) => {
        return p.types.some(item => typesToFilterBy.includes(item.type.name))
      });
    }
    return pokemons;
  }

  const applyGenerationsFilters = (pokemons: PokemonDTO[], generations: GenerationDTO[]) => {
    const generationsToApply = generations.filter(t => t.selected).map(t => t.name);
    if (generationsToApply.length > 0) {
      return pokemons.filter((p: PokemonDTO) => generationsToApply.includes(PokemonService.getGeneration(p)));
    }
    return pokemons;
  }

  const applyFilters = (pokemons: PokemonDTO[], types: TypeDTO[], generations: GenerationDTO[], newSearchTerm?: string) => {
    let filtered = pokemons;
    // filtered = applySearchTerm(filtered, newSearchTerm);
    filtered = applyTypesFilters(filtered, types);
    filtered = applyGenerationsFilters(filtered, generations);
    setFilteredPokemons(filtered);
    return filtered;
  }

  const changeTypeFilter = (index: number) => {
    const newTypes = [...types];
    if (!newTypes[index]) return;
    newTypes[index].selected = !newTypes[index].selected;
    setTypes(newTypes);
    localStorage.setItem('types', JSON.stringify(newTypes));
    applyFilters(pokemons, newTypes, generations);
  }

  const changeGenerationFilter = (index: number) => {
    const newGenerations = [...generations];
    if (!newGenerations[index]) return;
    newGenerations[index].selected = !newGenerations[index].selected;
    setGenerations(newGenerations);
    localStorage.setItem('generations', JSON.stringify(newGenerations));
    applyFilters(pokemons, types, newGenerations);
  }
  
  useEffect(() => {

    const storedSearchTerm = localStorage.getItem('searchTerm') || '';
    setSearchTerms(storedSearchTerm);
    Promise.all([loadTypes(), loadGenerations(), loadPokemons(storedSearchTerm)]).then(([types, generations, pokemons]) => {
      setLoading(false);
      setFilteredPokemons(pokemons);
      setPokemons(pokemons);
      applyFilters(pokemons, types, generations, storedSearchTerm)
    });
  }, []);

  const loadPokemons = async (searchTerm: string) => {
    const pokemons = await PokemonService.findByName(searchTerm, limit);
    return pokemons;
  }

  const loadTypes = async () => {
    let types: TypeDTO[] = JSON.parse(localStorage.getItem('types') || '[]');
    if (types.length === 0) {
      types = await PokemonService.getTypes();
      types = types.map(t => ({ ...t, selected: false }));
      localStorage.setItem('types', JSON.stringify(types));
    }
    setTypes(types);
    return types;
  }

  const loadGenerations = async () => {
    let generations: GenerationDTO[] = JSON.parse(localStorage.getItem('generations') || '[]');
    if (generations.length === 0) {
      generations = await PokemonService.getGenerations();
      generations = generations.map(t => ({ ...t, selected: false }));
      localStorage.setItem('generations', JSON.stringify(generations));
    }
    setGenerations(generations);
    return generations;
  }

  const showMore = () => {
    setLimit(limit + ITEMS_PER_PAGE);
    fetch(searchTerm, limit + ITEMS_PER_PAGE);
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main>
      <div className="filters">
        <hr className="h-px bg-gray-200 border-0"></hr>
        <div className="search-filer px-4 flex flex-col">
          <label>Search</label>
          <input type="text" disabled={isLoading} value={searchTerm} onChange={onSearchChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"/>
        </div>
        <hr className="h-px mt-4 bg-gray-200 border-0"></hr>
        <FilterAccordion disabled={isLoading} title="Type">
          {types.map((item: TypeDTO, index: number) => <span onClick={() => changeTypeFilter(index)} key={item.name} className={`inline-flex m-1 items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium inset-ring inset-ring-gray-500/10 uppercase ${item.selected ? `${item.name} text-white` : 'text-black'}`}>{item.name}</span>)}
        </FilterAccordion>
        <FilterAccordion disabled={isLoading} title="Generation">
          {generations.map((item: GenerationDTO, index: number) => <span onClick={() => changeGenerationFilter(index)} key={item.name} className={`inline-flex m-1 items-center rounded-md px-2 py-1 text-xs font-medium inset-ring inset-ring-gray-500/10 uppercase ${item.selected ? `text-black bg-green-100` : 'text-black'}`}>{item.name.split('-').join(' ')}</span>)}
        </FilterAccordion>
      </div>
      <div className="grid lg:grid-cols-6 sm:grid-cols-1 md:grid-cols-2">
          {filteredPokemons.slice(0, limit).map(pokemon => <PokemonThumbnail key={pokemon.id} pokemon={pokemon}/>)}
      </div>
      {filteredPokemons.length >= limit && <div className="flex justify-center">
        <button onClick={showMore} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2">Show More</button>
      </div>}
    </main>
  );
}
