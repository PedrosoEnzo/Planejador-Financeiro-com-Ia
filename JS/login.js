document.getElementById('loginButton').addEventListener('click', function() {
    console.log("Botão de login clicado"); // Verifica se o evento é disparado

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
    })
    .then(response => {
        console.log("Resposta recebida:", response); // Verifica a resposta
        if (!response.ok) {
            throw new Error('Erro ao fazer login');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('feedback').innerText = data.message;
    })
    .catch(error => {
        console.error("Erro:", error); // Verifica se há um erro específico aqui
        document.getElementById('feedback').innerText = error.message;
    });
});
