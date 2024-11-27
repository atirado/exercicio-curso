document.getElementById('searchButton').addEventListener('click', () => {
    const input = document.getElementById('pokemonInput').value.toLowerCase().trim();
    fetch(`https://pokeapi.co/api/v2/pokemon/${input}`)
        .then(response => {
            if (!response.ok) throw new Error('Pokémon não encontrado!');
            return response.json();
        })
        .then(data => {
            document.getElementById('pokemonTitle').textContent = data.name.toUpperCase();
            document.getElementById('pokemonImage').src = data.sprites.front_default;
            document.getElementById('pokemonType').textContent = 
                `Tipo(s): ${data.types.map(type => type.type.name).join(', ')}`;
            const stats = data.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ');
            document.getElementById('pokemonStats').textContent = `Estatísticas: ${stats}`;
        })
        .catch(error => {
            alert('Erro: ' + error.message);
            console.error(error);
        });
});

function loadPokemonTypes() {
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
        .then(response => response.json())
        .then(data => {
            const typesContainer = document.getElementById('tipos de pokemom');
            typesContainer.innerHTML = ''; 
            data.results.forEach(type => {
                fetch(type.url)
                    .then(res => res.json())
                    .then(typeData => {
                        const typeDiv = document.createElement('div');
                        typeDiv.innerHTML = `<h3>${typeData.name.toUpperCase()}</h3>
                                             <p>${typeData.damage_relations.double_damage_from
                                                .map(dmg => dmg.name)
                                                .join(', ') || 'Sem descrições disponíveis.'}</p>`;
                        typesContainer.appendChild(typeDiv);
                    });
            });
        })
        .catch(error => console.error('Erro ao carregar os tipos:', error));
}

window.onload = loadPokemonTypes;
