document.getElementById('loginButton').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    console.log('Tentando logar com email:', email, 'senha:', senha); // Log para depuração

    fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao fazer login');
        }
        return response.json();
    })
    .then(data => {
        console.log('Resposta do servidor:', data); // Log da resposta do servidor
        document.getElementById('feedback').innerText = data.message;
    })
    .catch(error => {
        console.error('Erro:', error); // Log do erro
        document.getElementById('feedback').innerText = error.message;
    });
});
