const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Conexão com o banco de dados MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@Enzo091207',
    database: 'planejador_financeiro',
});

// Endpoint de login
router.post('/login', (req, res) => {
    const { email, senha } = req.body;
    
    console.log('Dados recebidos - Email:', email, 'Senha:', senha);
    
    connection.query(
        'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
        [email, senha],
        (error, results) => {
            if (error) {
                console.error('Erro ao consultar no banco de dados:', error);
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

module.exports = router;
