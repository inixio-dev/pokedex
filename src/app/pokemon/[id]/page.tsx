import { EvolutionChain } from "@pokedex/app/components/EvolutionChain";
import type { PokemonDTO } from "@pokedex/data/dtos/Pokemon.dto";
import { PokemonService } from "@pokedex/app/services/pokemon.service"

export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const pokemonData: PokemonDTO = await PokemonService.getPokemonDetail(id);
  const pokemonEvolutionChain = await PokemonService.getPokemonEvolutionChain(pokemonData, true);
  const stats: any = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Special Attack',
    'special-defense': 'Special Defense',
    speed: 'Speed'
  }
  return (
    <div className="pokedex">
          <div className="p-2 pb-0">
              <div className="flex flex-col max-w bg-white border border-gray-200 rounded-lg shadow-sm p-3">
                  <div className="text-center font-bold capitalize">
                    <h1>{pokemonData.name}</h1>
                  </div>
                  {pokemonData.sprites?.front_default ? <img className="rounded-full border border-gray-200 m-auto" src={pokemonData.sprites?.front_default} alt="" /> : null}
                  <hr className="h-px my-4 bg-gray-200 border-0"></hr>                    
                  <div className="types flex flex-wrap m-2 justify-center">
                      {pokemonData.types.map(item => <span key={item.type.name} className={`inline-flex m-1 items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-white inset-ring inset-ring-gray-500/10 uppercase ${item.type.name}`}>{item.type.name}</span>)}
                  </div>
                  <hr className="h-px my-4 bg-gray-200 border-0"></hr>
                  <div className="generation flex dlex-wrap justify-center">
                      <span key={pokemonData.name} className={`inline-flex mb-3 items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 inset-ring inset-ring-gray-500/10 uppercase`}>{PokemonService.getGeneration(pokemonData)?.split('-').join(' ')}</span>
                  </div>
                  <hr className="h-px my-2 bg-gray-200 border-0"></hr>
                  <div className="stats">
                    <ul role="list" className="divide-y divide-gray-200">
                    {pokemonData.stats.map(item => (<li key={item.stat.name} className="flex justify-between"><b>{stats[item.stat.name]}</b><span>{item.base_stat}</span></li>))}
                    </ul>
                  </div>
              </div>
          </div>
        <EvolutionChain evolutionChain={pokemonEvolutionChain as PokemonDTO[]} current={pokemonData}/>
    </div>
  )
}