document.getElementById('loginButton').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    console.log('Tentando enviar requisição para o backend');
    console.log('Email:', email, 'Senha:', senha);  // Verificando se os dados estão corretos

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
        document.getElementById('feedback').innerText = data.message;
    })
    .catch(error => {
        document.getElementById('feedback').innerText = error.message;
        console.log('Erro no frontend:', error);  // Log de erro no frontend
    });
});
