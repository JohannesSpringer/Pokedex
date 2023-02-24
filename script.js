let currentPokemon;
let maxStats = {
    'hp': 255,
    'attack': 190,
    'defense': 230,
    'special-attack': 194,
    'special-defense': 230,
    'speed': 180
};

async function showPokemonDetails(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/` + id.toString();
    let response = await fetch(url);
    currentPokemon = await response.json();
    renderPokemonInfo();
}

async function renderPokemon() {
    document.getElementById('overview').innerHTML = '';
    for (let i = 1; i < 151; i++) {
        let url = 'https://pokeapi.co/api/v2/pokemon/' + i.toString();
        let response = await loadPokemon(url);
        let newPokemon = await response.json();
        document.getElementById('overview').innerHTML += await renderSinglePokemon(newPokemon);
    }
}

async function loadPokemon(url) {
    return await fetch(url);
}

async function renderSinglePokemon(pokemon) {
    return `<div class="pokemon-card ${await getBgColor(pokemon)}" onclick="showPokemonDetails(${pokemon['id']})">
                <h3>${pokemon['name']}</h3>
                <div class="pokemonId">#${String(pokemon['id']).padStart(3, '0')}</div>
                <div class="pokemon-types-overview">${getTypes(pokemon)}</div>
                <img src="${pokemon['sprites']['other']['home']['front_default']}" class="pokemon-img">
            </div>`;
}

function getTypes(pokemon) {
    let types = pokemon['types'];
    let htmlTypes = '';
    for (let i = 0; i < types.length; i++) {
        const type = types[i]['type']['name'];
        htmlTypes += `<span class="pokemon-type-overview">${type}</span>`;
    };
    return htmlTypes;
}

function renderPokemonInfo() {
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonImg').src = currentPokemon['sprites']['other']['home']['front_default'];
    document.getElementById('pokemonId').innerHTML = '#' + String(currentPokemon['id']).padStart(3, '0');
    renderPokemonTypes();
    renderPokemonStats();
    getColor();
    document.getElementById('singleView').classList.remove('d-none');
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

function renderPokemonStats() {
    let stats = currentPokemon['stats'];
    document.getElementById('pokemonInfoTable').innerHTML = '';
    for (let i = 0; i < stats.length; i++) {
        const stat = stats[i];
        document.getElementById('pokemonInfoTable').innerHTML += htmlPokemonInfoTableRow(stat);
    }
}

function htmlPokemonInfoTableRow(stat) {
    let calculatedPartOfStat = stat['base_stat'] / maxStats[stat['stat']['name']] * 100;
    let bgProgressbar;
    if (statSmallerThanMedium(stat, maxStats[stat['stat']['name']])) {
        bgProgressbar = 'bg-danger';
    } else bgProgressbar = 'bg-success';
    return `<tr>
                <td>${stat['stat']['name']}</td>
                <td>${stat['base_stat']}</td>
                <td>
                    <div class="progress" role="progressbar" aria-label="Success example" aria-valuenow="25"
                        aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar ${bgProgressbar}" style="width: ${calculatedPartOfStat}%"></div>
                    </div>
                </td>
            </tr>`;
}

function statSmallerThanMedium(stat, calculatedPartOfStat) {
    return stat['base_stat'] < (calculatedPartOfStat / 2);
}

async function getColor() {
    let url = currentPokemon['species']['url'];
    let response = await fetch(url);
    let color = await response.json();
    let bgColor = color['color']['name'];
    document.getElementById('singleView').classList.add('bg-' + bgColor);
}

async function getBgColor(pokemon) {
    let url = pokemon['species']['url'];
    let response = await fetch(url);
    let color = await response.json();
    let bgColor = color['color']['name'];
    return ('bg-' + bgColor);
}