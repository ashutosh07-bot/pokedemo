import { getData } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export default async function PokeData({ params }) {
  const { name } = params;
  const pokemon = await getData(`/pokemon/${name}`);
  return (
    <div className="ml-4 p-5">
      <nav className="mb-4 flex items-center text-lg">
        <Link href="/" className="text-green-500 hover:underline">
          Home
        </Link>
        <span className="mx-2">{">>"}</span>
        <span className="text-gray-700 capitalize">{name}</span>
      </nav>
      <div className="container mx-auto p-4 flex justify-center">
        <div className="w-full max-w-xl">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="mx-auto mb-4 h-full">
              <Image
                width={600}
                height={520}
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-full h-60  bg-white rounded-lg object-contain"
              />
            </div>
            <div className="bg-orange-200 p-4 rounded-lg">
              <h1 className="text-xs font-bold mb-2">Name: {pokemon.name}</h1>
              <p className="text-xs mb-2">
                Type: {pokemon.types.map((type) => type.type.name).join(", ")}
              </p>
              <div className="mb-2">
                <h2 className="text-sm font-semibold">Stats:</h2>
                <ul>
                  {pokemon.stats.map((stat) => (
                    <li className="text-xs" key={stat.stat.name}>
                      {stat.stat.name}: {stat.base_stat}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <h2 className="text-sm font-semibold">Abilities:</h2>
                <ul>
                  {pokemon.abilities.map((ability) => (
                    <li className="text-xs" key={ability.ability.name}>
                      {ability.ability.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-2">
                <h2 className="text-sm font-semibold">Some Moves:</h2>
                <ul>
                  {pokemon.moves.slice(0, 10).map((move) => (
                    <li className="text-xs" key={move.move.name}>
                      {move.move.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
