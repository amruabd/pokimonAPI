const url = 'https://pokeapi.co/api/v2/';
const offsetEndpoint = 'pokemon?limit=30&offset=';
const pokemon = 'pokemon/';
let offset = 0;


//getPokemon(offsetEndpoint);
async function getPokemon(text) {
  try {
    const response = await fetch(url + text);
    if (!response.ok) {
      throw new Error('Pokémon nicht gefunden');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}


async function showAllPokimons(offset) {
  const pokemonList = document.querySelector('.pokemon-list');
  const data = await getPokemon(offsetEndpoint + offset);
  console.log(data);
  let namesList = data.results;
  for (let i = 0; i < namesList.length; i++) {
    let name = namesList[i].name;
    const indvedualPokemon = await getPokemon(pokemon + name);
    //console.log(indvedualPokemon);
    pokemonList.innerHTML += `
      <a href="/pokimonAPI/one-pokimon/index.html?id=${indvedualPokemon.id}">
        <li id="${indvedualPokemon.id}">
        <img src="${indvedualPokemon.sprites.other.home.front_shiny}" alt="${indvedualPokemon.name}">
        <h3>${indvedualPokemon.name}</h3>
      </li></a>
    `;

  }
}
showAllPokimons(offset);

async function searchPokimon() {
  const search = document.querySelector('#search');
  const button = document.querySelector('#button');
  const pokimonName = search.value;
  console.log(pokimonName);
  const searchedPokemon = await getPokemon(pokemon + pokimonName);
  window.location.href = `/one-pokimon/index.html?id=${searchedPokemon.id}`;
}

async function next(){
  const pokemonList = document.querySelector('.pokemon-list');
  pokemonList.innerHTML = "";
  console.log("next");
  offset += 30;
  showAllPokimons(offset);
}

async function previous(){
  const pokemonList = document.querySelector('.pokemon-list');
  
  if(offset <= 0){
    offset = 0;
    return;
  }else{
    pokemonList.innerHTML = "";
    offset -= 30;
    showAllPokimons(offset);
  }
}


