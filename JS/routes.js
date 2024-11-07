const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Configuração da conexão com o MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@Enzo091207',
    database: 'planejador_financeiro',
});

// Endpoint de login
router.post('/login', (req, res) => {
    console.log('Requisição recebida no /api/login');
    const { email, senha } = req.body;
    console.log(`Email: ${email}, Senha: ${senha}`);

    connection.query(
        'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
        [email, senha],
        (error, results) => {
            if (error) {
                console.log('Erro ao consultar o banco de dados:', error);
                return res.status(500).json({ error: 'Erro no servidor' });
            }
            if (results.length > 0) {
                console.log('Login bem-sucedido!');
                return res.status(200).json({ message: 'Login bem-sucedido!' });
            } else {
                console.log('Credenciais inválidas');
                return res.status(401).json({ error: 'Credenciais inválidas' });
            }
        }
    );
});

module.exports = router;
