const url = 'https://pokeapi.co/api/v2/';

async function getPokemon(text) {
  const response = await fetch(url + 'pokemon/' + text);
  const data = await response.json();
  return data;
}
// Diese Funktion extrahiert die Pokémon-ID aus der URL
function getPokemonIdFromUrl() {
  // Erstellen Sie ein URLSearchParams-Objekt basierend auf der aktuellen URL
  const queryParams = new URLSearchParams(window.location.search);
  // Holen Sie sich den Wert des 'id'-Parameters
  const pokemonId = queryParams.get('id');
  return pokemonId;
}
// Diese Funktion verwendet die extrahierte ID, um das Pokémon zu suchen
async function displayPokemonById() {
  const pokemonId = getPokemonIdFromUrl();
  if (pokemonId) {
    const pokemonData = await getPokemon(pokemonId);
    console.log(pokemonData);
    const pokemonImg = document.getElementById('pokemon-img');
    pokemonImg.src = pokemonData.sprites.other.home.front_shiny;
    const pokemonName = document.getElementById('pokemon-name');
    pokemonName.innerText = pokemonData.name;
    const attackValue = document.getElementById('attack-value');
    attackValue.innerText = pokemonData.stats[1].base_stat;
    const attackBar = document.getElementById('attack-bar');
    attackBar.style.width = pokemonData.stats[1].base_stat + 'px';
    const defenseValue = document.getElementById('defense-value');
    defenseValue.innerText = pokemonData.stats[2].base_stat;
    const defenseBar = document.getElementById('defense-bar');
    defenseBar.style.width = pokemonData.stats[2].base_stat + 'px';
    const speedValue = document.getElementById('speed-value');
    speedValue.innerText = pokemonData.stats[5].base_stat;
    const speedBar = document.getElementById('speed-bar');
    speedBar.style.width = pokemonData.stats[5].base_stat + 'px';
    
  }
}
// Rufen Sie die Funktion auf, wenn die Seite geladen wird
window.onload = displayPokemonById;

async function next(){
  const pokemonId = getPokemonIdFromUrl();
  const nextPokemonId = parseInt(pokemonId) + 1;
  window.location.href = `/one-pokimon/index.html?id=${nextPokemonId}`;
}

function previous(){
  const pokemonId = getPokemonIdFromUrl();
  if (pokemonId <= 1) {
    return;
  }
  const previousPokemonId = parseInt(pokemonId) - 1;
  window.location.href = `/one-pokimon/index.html?id=${previousPokemonId}`;
}