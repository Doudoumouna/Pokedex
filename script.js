let currentPokemon = 0;
let allPokemons = [];
let load = 43;


async function loadPokemon() {//asyncrone funktion, das bedeutet das wo gewisse sachen erst noch fertig geladen werden müssen.
    for (let i = 0; i < 43; i++) {//eine Schleife die von 1 bis 42 zählt. Für jeden Wert von "i" in der Schleife, wird eine URL erstellt.
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;//diese URL wird verwendet, um eine Anfrage (Request) an die PokeAPI zu senden.
        let response = await fetch(url);//Die Antwort (Response) von der API wird als variable "Response" gespeichert.
        currentPokemon = await response.json();//Dann wird die Antwort in ein JSON-Format konvertiert und als variable "responseAsJson" gespeichert.
        allPokemons.push(currentPokemon);//Schließlich wird die "responseAsJson" in ein Array "allPokemons" hinzugefügt und die Funktion "renderPokemonInfo" aufgerufen.
        getPokedex(i);
        console.log(`allPokemons${i}`,currentPokemon);
        renderPokemonInfo(i);

    }


}
loadPokemon();

function previous(i){
    callSelection(i-1);
}
function next(i){
    callSelection(i+1);
}
//Diese Funktion wird verwendet, um das nächste Pokemon im Array "allPokemons" anzuzeigen.
function next() {
  if (currentPokemon === allPokemons.length - 1) {
    currentPokemon = 0;
  } else {
    currentPokemon++;
  }
  renderPokemonInfo(currentPokemon);
}
//Innerhalb der Funktion wird zuerst überprüft, ob der aktuelle Pokemon-Index "currentPokemon" gleich 0 ist. Wenn ja, wird der "currentPokemon" auf die Länge des Arrays "allPokemons" minus 1 gesetzt. Andernfalls wird "currentPokemon" um 1 reduziert.
function prev() {
  if (currentPokemon === 0) {
    currentPokemon = allPokemons.length - 1;
  } else {
    currentPokemon--;
  }
  renderPokemonInfo(currentPokemon);
}


function getPokedex(i) {
    document.getElementById('pokedex-container').innerHTML += ``;
    document.getElementById('pokedex-container').innerHTML += `
        <div class="pokemon" onclick="seePokemon(${i})" id="pokemon${i}">
            <div class="pokedex" id="pokedex${i}">
            <h1 id="pokemon-name${i}"></h1>
        </div>
        <img class="poke-img" id="poke-img${i}" src="" alt="">
        <div class="info-container" id="info-container${i}">
        </div>
`;
    getBackGround(i);
    getTypes(i);

}


function getBackGround(i) {
    let types = allPokemons[i]['types'];
    for (let j = 0; j < types.length; j++) {
        const type = types[j];
        const name = type['type']['name'];
        if (name.includes('grass')) {
            document.getElementById(`pokemon${i}`).classList.add('bg-grass');
        }
    }
}


function getTypes(i) {
    let types = currentPokemon['types'];
    for (let j = 0; j < types.length; j++) {
        const type = types[j];

        document.getElementById(`info-container${i}`).innerHTML += `
        <div class="types"><b>${type['type']['name']}</b></div>
        `;
    }
}

function getTypesinPopup(i) {
    let container = document.getElementById(`types`);
    let types = allPokemons[i]['types'];

    container.innerHTML = '<b>Types:</b>';
    for (let j = 0; j < types.length; j++) {
        const type = types[j];
        container.innerHTML += `
        ${type['type']['name']}  |
        `;
    }
}
function loadMore(){
    load = load+20;
    loadPokedexContainer();
}

async function loadPokedexContainer(){
    for (let i = currentLoad; i < load; i++) {
        currentLoad++;
        let thisPokemonUrl = allPokemons[i]['url'];
        let thisPokemon = await fetch(thisPokemonUrl);
        let currentPokemon = await thisPokemon.json();
        renderMiniCarts(currentPokemon);            
    }   
}





function renderPokemonInfo(i) {
    document.getElementById(`pokemon-name${i}`).innerHTML = currentPokemon['name'];
    document.getElementById(`poke-img${i}`).src = currentPokemon['sprites']['front_shiny'];
}



function getAbilities(i) {
    let container = document.getElementById('abilities');
    container.innerHTML = '<b>Abilities:</b>';
    let abilities = allPokemons[i]['abilities'];
    for (let j = 0; j < abilities.length; j++) {
        const ability = abilities[j];
        container.innerHTML += `
        ${ability['ability']['name']} |`;
    }
}

function seePokemon(i) {
    
    openPopup();
    const image = document.getElementById(`poke-img-popup`);
    const name = document.getElementById('popup-name');
    const weight = document.getElementById('weight');
    const exp = document.getElementById('exp');
    getTypesinPopup(i);
    getAbilities(i);
    let pokemon = allPokemons[i];
    image.src = pokemon['sprites']['front_shiny'];
    name.innerHTML = pokemon['name'];
    weight.innerHTML = `<b>Weight:</b> ${pokemon['weight']}`;
    exp.innerHTML = `<b>Base-Experience:</b> ${pokemon['base_experience']}`;
}

function openPopup() {
    document.getElementById('popup-container').classList.remove('display-none');
}

function closePopup() {
    
    document.getElementById('popup-container').classList.add('display-none');
}


