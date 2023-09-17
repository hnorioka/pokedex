const pokemonName = document.querySelector('.pokemonName')
const pokemonID = document.querySelector('.pokemonId')
const pokemonImage = document.querySelector('.pokemonImage')

const form = document.querySelector('.form')
const input = document.querySelector('.inputSearch')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1;

const APIPokemon = async (pokemon) => {

	const fetchResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); //promise la async ** await

	if (fetchResponse.status === 200) {
		const data = await fetchResponse.json();
		return data;
	}
}

const renderPokemon = async (pokemon) => {
	pokemonName.innerHTML = 'Procurando...';
	pokemonID.innerHTML = '';

	const data =  await APIPokemon(pokemon);

	if (data) {
		pokemonImage.style.display = 'block';
		pokemonName.innerHTML = data.name;
		pokemonID.innerHTML = data.id;
		pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

		input.value = '';

		searchPokemon = data.id
	} else {
		pokemonName.innerHTML = 'Não encontrado';
		pokemonID.innerHTML = '';
		pokemonImage.style.display = 'none';
	}

}

form.addEventListener('submit', (event) => {
	event.preventDefault();

	renderPokemon(input.value.toLowerCase());
})

buttonPrev.addEventListener('click', () => {
	if (searchPokemon > 1) {
		searchPokemon -= 1;
	renderPokemon(searchPokemon);
	}

})

buttonNext.addEventListener('click', () => {
	searchPokemon += 1;
	renderPokemon(searchPokemon);

})

renderPokemon(searchPokemon) 