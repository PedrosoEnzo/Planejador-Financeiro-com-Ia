// login.js
document.getElementById('loginButton').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        const result = await response.json();
        document.getElementById('feedback').innerText = result.message;
    } catch (error) {
        document.getElementById('feedback').innerText = 'Erro na conexão. Tente novamente.';
    }
});
