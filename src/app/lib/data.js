export async function getData(endpoint) {
  try {
    const path = `https://pokeapi.co/api/v2/${endpoint}`;
    const response = await fetch(path);

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const res = await response.json();
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function getPokemons() {
  try {
    const res = await getData("pokemon?limit=100");

    if (res === null) {
      throw new Error(`HTTP error! status: ${res}`);
    }

    const pokemonDetails = await Promise.all(
      res.results.map(async (pokemon) => {
        const pokemonResponse = await fetch(pokemon.url);

        if (!pokemonResponse.ok) {
          throw new Error(`HTTP error! status: ${pokemonResponse.status}`);
        }

        const pokemonData = await pokemonResponse.json();

        return {
          name: pokemon.name,
          image: pokemonData.sprites.front_default,
          types: pokemonData.types.map((typeInfo) => typeInfo.type.name),
        };
      })
    );

    return pokemonDetails;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return [];
  }
}
