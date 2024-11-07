document.getElementById('loginButton').addEventListener('click', function() {
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
        if (!response.ok) {
            throw new Error('Erro ao fazer login');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('feedback').innerText = data.message;
        // Redirecionar para outra página, se necessário
        // window.location.href = '../public/formulario.html';
    })
    .catch(error => {
        document.getElementById('feedback').innerText = error.message;
    });
});

