const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

const fetchPokemon = () => {
    const pokeNombreInput = document.getElementById("pokeNombre");
    let pokeNombre = pokeNombreInput.value;
    pokeNombre = pokeNombre.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeNombre}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImg("./img/error.png")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            const sprite = data.sprites.front_default;
        //asigna los status y tipos en nuestra data
        const { stats, types } = data;
        //busca el nombre del pokemon y lo asigna en la data
        pokeName.textContent = data.name;
        //recopila el sprite del pokemon
        pokeImg.setAttribute('src', sprite);
        //identifica al pokemon por su id
        pokeId.textContent = `Nº ${data.id}`;
        renderPokemonTypes(types);
        renderPokemonStats(stats);
        }
    });
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");

        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    /*se setan los valores de cada pokemon para que 
    se actualicen si se hace una busqueda en seguida de 
    otra*/

    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

//mostrar imagen de no encontrado para pokemones inexistentes 
const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('img', './img/error.png');
    pokeImg.style.background = '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}