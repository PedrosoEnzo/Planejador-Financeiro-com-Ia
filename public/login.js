document.getElementById('loginButton').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    fetch('/login', { // Sem o localhost, pois já estamos na mesma origem
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('feedback').innerText = data.message;
    })
    .catch(error => {
        document.getElementById('feedback').innerText = error.message;
    });
});
