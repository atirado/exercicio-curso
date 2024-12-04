document.getElementById('form-contato').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;
  
    if (nome && email && mensagem) {
      alert('Mensagem enviada com sucesso!');
      this.reset();
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  });
  
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('projetos-container');
    data.slice(0, 3).forEach(projeto => {
      const projectElement = document.createElement('div');
      projectElement.innerHTML = `<h3>${projeto.title}</h3><p>${projeto.body}</p>`;
      container.appendChild(projectElement);
    });
  })
  .catch(error => console.error('Erro ao carregar projetos:', error));