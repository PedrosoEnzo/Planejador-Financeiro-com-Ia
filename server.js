// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar a pasta 'public' para servir o HTML e o CSS
app.use(express.static(path.join(__dirname, 'public')));

// Configurar conexão ao banco de dados MySQL
const connection = mysql.createConnection({
    host: 'localhost',      // Endereço do servidor MySQL (ajuste se necessário)
    user: 'root',    // Substitua pelo seu usuário do MySQL
    password: '@Enzo091207',  // Substitua pela sua senha do MySQL
    database: 'planejador_financeiro'  // Substitua pelo nome do seu banco de dados
});

connection.connect(err => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL!');
});

// Rota para autenticação do login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    // Query para verificar se o usuário existe no banco
    const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
    connection.query(query, [email, senha], (error, results) => {
        if (error) throw error;

        if (results.length > 0) {
            res.json({ success: true, message: 'Login bem-sucedido!' });
        } else {
            res.json({ success: false, message: 'Email ou senha incorretos.' });
        }
    });
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
