const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Para hashing de senhas

const app = express();
const port = 3000;

// Configuração do bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Para servir arquivos estáticos, como CSS

// Conexão com o banco de dados MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'seu_usuario', // substitua pelo seu usuário do MySQL
    password: 'sua_senha', // substitua pela sua senha do MySQL
    database: 'tcc_db' // nome do banco de dados que criamos
});

// Rota de login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Consultar usuário no banco de dados
    connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
        if (error) {
            return res.status(500).send('Erro no servidor');
        }
        
        if (results.length === 0) {
            return res.status(401).send('Usuário não encontrado');
        }

        const user = results[0];
        
        // Comparar a senha fornecida com a senha armazenada (hash)
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                res.send('Login bem-sucedido!');
            } else {
                res.status(401).send('Senha incorreta');
            }
        });
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
