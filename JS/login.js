document.getElementById('loginButton').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const result = await response.json();

        const feedback = document.getElementById('feedback');
        if (result.success) {
            feedback.textContent = 'Login bem-sucedido!';
            feedback.style.color = 'green';
            // Redirecionar para a página inicial
            window.location.href = 'dashboard.html';
        } else {
            feedback.textContent = 'Email ou senha incorretos.';
            feedback.style.color = 'red';
        }
    } catch (error) {
        console.error('Erro:', error);
        feedback.textContent = 'Ocorreu um erro. Tente novamente mais tarde.';
        feedback.style.color = 'red';
    }
});
