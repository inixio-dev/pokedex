"use client";

import { type PokemonDTO, type SpeciesDTO } from '../../data/dtos/Pokemon.dto';
import Link from "next/link";

export function EvolutionChain({evolutionChain, current}: {evolutionChain: PokemonDTO[], current: PokemonDTO}) {
    return <div className="mb-2 max-w p-2 bg-white border border-gray-200 rounded-lg shadow-sm py-5 mx-2 mt-2 text-center capitalize">
        <b>Evolution Chain</b>
        <div className="flex justify-around mt-2">
            {evolutionChain.map(evolution => {
                return <div key={evolution.id}>
                    <Link href={`/pokemon/${evolution.id}`}>
                        <img
                            alt={evolution.name}
                            src={evolution.sprites?.front_default}
                            className="relative inline-block rounded-full border border-gray-200"
                        />
                        <h2>{evolution.name}</h2>
                        {evolution.id === current.id || evolution.name === current.species.name ? <div>▲</div> : ''}
                    </Link>
                </div>
            })}
        </div>
    </div>
}