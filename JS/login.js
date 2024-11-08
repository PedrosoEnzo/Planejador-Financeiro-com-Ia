// login.js
document.getElementById('loginButton').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Verifica se a resposta do servidor está correta
        if (data.success) {
            console.log("Redirecionando para formulario.html");
            window.location.href = '/formulario.html'; // Redireciona para formulario.html
        } else {
            alert(data.message); // Caso contrário, exibe uma mensagem de erro
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao tentar fazer login.');
    });
});
