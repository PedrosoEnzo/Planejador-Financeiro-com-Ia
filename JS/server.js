// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public'))); // Serve arquivos estáticos

// Configuração da conexão com o MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@Enzo091207',
    database: 'planejador_financeiro',
});

// Rota para exibir o formulário
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"));
});

// Endpoint de login
app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;
    connection.query(
        'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
        [email, senha],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Erro no servidor' });
            }
            if (results.length > 0) {
                return res.status(200).json({ message: 'Login bem-sucedido!' });
            } else {
                return res.status(401).json({ error: 'Credenciais inválidas' });
            }
        }
    );
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

