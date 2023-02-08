let currentPokemon;

async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/charmander`;
    //let url = `https://pokeapi.co/api/v2/pokemon/bulbasaur`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log(currentPokemon);

    renderPokemonInfo();
}

function renderPokemonInfo() {
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonImg').src = currentPokemon['sprites']['other']['home']['front_default'];
    document.getElementById('pokemonId').innerHTML = '#' + String(currentPokemon['id']).padStart(3, '0');
    renderPokemonTypes();
}

function renderPokemonTypes() {
    let types = currentPokemon['types'];
    document.getElementById('pokemonTypes').innerHTML = '';
    for (let i = 0; i < types.length; i++) {
        const type = types[i]['type']['name'];
        document.getElementById('pokemonTypes').innerHTML += `
            <span class="pokemon-type">${type}</span>
        `;
    }
}