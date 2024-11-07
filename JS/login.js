document.getElementById('loginButton').addEventListener('click', function() {
    console.log("Botão de login clicado"); // Este log deve aparecer no console do navegador

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
        console.log("Resposta recebida:", response); // Verifica se a resposta do servidor está retornando
        if (!response.ok) {
            throw new Error('Erro ao fazer login');
        }
        return response.json();
    })
    .then(data => {
        console.log("Dados recebidos do servidor:", data); // Log para verificar a resposta do servidor
        document.getElementById('feedback').innerText = data.message;
    })
    .catch(error => {
        console.error("Erro:", error); // Verifique se há um erro específico aqui
        document.getElementById('feedback').innerText = error.message;
    });
});
