const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Aqui ajustamos o caminho para a pasta public dentro de backend
app.use(express.static(path.join(__dirname, 'public'))); // Serve arquivos estáticos da pasta 'public'

// Dados simulados de banco de dados (sem MySQL, apenas para testar)
const usuarios = [
    { email: 'test@example.com', senha: 'senha123' }
];

// Rota para o login (não precisa de banco de dados)
app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    if (usuario) {
        return res.status(200).json({ message: 'Login bem-sucedido!' });
    } else {
        return res.status(401).json({ message: 'Credenciais inválidas' });
    }
});

// Rota para servir a página de login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
