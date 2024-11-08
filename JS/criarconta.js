document.getElementById("formCadastro").addEventListener("submit", function(event) {
    event.preventDefault();  // Impede o envio tradicional do formulário

    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const datadenascimento = document.getElementById("datadenascimento").value;

    // Verificar se a senha tem ao menos 6 caracteres (opcional, ajuste conforme necessário)
    if (senha.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return;
    }

    // Enviar os dados para o backend
    fetch('/criarconta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome,
            telefone,
            email,
            senha,
            datadenascimento
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Conta criada com sucesso!');
            window.location.href = "login.html"; // Redireciona para a página de login após cadastro
        } else {
            alert('Erro ao criar conta: ' + data.message);
        }
    })
    .catch(error => console.error('Erro:', error));
});
