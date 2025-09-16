import Link from "next/link";
import { type PokemonDTO } from "../../data/dtos/Pokemon.dto";
import { PokemonService } from "../services/pokemon.service";
export function PokemonThumbnail({pokemon}: {pokemon: PokemonDTO}) {
    return <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm m-2 text-center pt-4">
            <Link href={`/pokemon/${pokemon.id}`}>
                {pokemon?.sprites?.front_default ? <img className="m-auto rounded-full border border-gray-200" src={pokemon?.sprites?.front_default} alt={pokemon.name} /> : null}
                <div>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 capitalize">{pokemon.name}</h5>
                </div>
                <div className="types flex flex-wrap m-2 justify-center">
                    {pokemon.types.map(item => <span key={item.type.name} className={`inline-flex m-1 items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-white inset-ring inset-ring-gray-500/10 uppercase ${item.type.name}`}>{item.type.name}</span>)}
                </div>
                <div className="generation">
                    <span key={pokemon.name} className={`inline-flex mb-3 items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 inset-ring inset-ring-gray-500/10 uppercase`}>{PokemonService.getGeneration(pokemon)?.split('-').join(' ')}</span>
                </div>
            </Link>
        </div>

}