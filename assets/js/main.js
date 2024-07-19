const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li id="details-btn" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>

            <ul class="poke-stats">
                <li><b>Attributes</b></li>
                <li>Weight: ${pokemon.weight / 10}kg</li>
                <li>Height: ${pokemon.height / 10}m</li>
                <li>Main move: ${pokemon.mainmove}</li>
                <li>Ability: ${pokemon.abi}</li>
            </ul>
            <ul class="poke-stats">
                <li><b>Stats</b></li>
                <li>HP: ${pokemon.hp}</li>
                <li>ATK: ${pokemon.atk}</li>
                <li>DEF: ${pokemon.def}</li>
                <li>SATK: ${pokemon.spcatk}</li>
                <li>SDEF: ${pokemon.spcdef}</li>
                <li>SPD: ${pokemon.speed}</li>
            </ul>
            
            <input type="button" value="X" class="closeButton" id="closeBtn">
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
})

let modal = document.querySelector('#modal-id');
let closeModalBtn = document.querySelector('#closeBtn');

document.addEventListener('click', function(e) {
    let clickedLi = e.target.closest('#details-btn');

    if (clickedLi) {
        let pokeClass = clickedLi.classList[1];
        var pokeLi = document.querySelector('#pokemon-modal');

        modal.style.display = "flex";
        pokeLi.innerHTML = clickedLi.innerHTML;
        pokeLi.classList = pokeClass;
        pokeLi.classList.add("show");
    }

    if(e.target.id == "closeBtn"){
        modal.style.display = "none";
    }
})