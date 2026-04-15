const BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList(limit = 20, offset = 0) {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error('Falha ao buscar lista de Pokémon');
  const data = await res.json();

  const details = await Promise.all(
    data.results.map(p => fetchPokemon(p.name))
  );
  return { pokemon: details, count: data.count };
}

export async function fetchPokemon(nameOrId) {
  const res = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
  if (!res.ok) throw new Error(`Pokémon "${nameOrId}" não encontrado`);
  return res.json();
}

export async function fetchPokemonSpecies(id) {
  const res = await fetch(`${BASE_URL}/pokemon-species/${id}`);
  if (!res.ok) throw new Error('Falha ao buscar espécie');
  return res.json();
}

export async function fetchEvolutionChain(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Falha ao buscar cadeia evolutiva');
  return res.json();
}

export async function fetchTypes() {
  const res = await fetch(`${BASE_URL}/type?limit=18`);
  if (!res.ok) throw new Error('Falha ao buscar tipos');
  return res.json();
}

export async function fetchType(name) {
  const res = await fetch(`${BASE_URL}/type/${name}`);
  if (!res.ok) throw new Error(`Tipo "${name}" não encontrado`);
  return res.json();
}

export function getPokemonImage(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function getPokemonImageAnimated(id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export function getPokemonId(url) {
  const parts = url.split('/').filter(Boolean);
  return parseInt(parts[parts.length - 1]);
}

export function flattenChain(chain) {
  const result = [];
  function traverse(node) {
    result.push(node.species);
    node.evolves_to.forEach(traverse);
  }
  traverse(chain);
  return result;
}
