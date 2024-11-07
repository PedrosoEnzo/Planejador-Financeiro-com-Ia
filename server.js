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
app.use(express.static(path.join(__dirname, 'public'))); // Serve arquivos estáticos da pasta public

// Configuração da conexão com o MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Altere para o seu usuário
    password: '@Enzo091207', // Altere para a sua senha
    database: 'planejador_financeiro', // Nome do banco
});

// Teste de conexão
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar com o banco de dados: ', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

// Endpoint para exibir o formulário HTML
app.use(express.static(path.join(__dirname, '/login'))); // Serve arquivos estáticos da pasta public


// Endpoint de login
app.post('/', (req, res) => {
    const { email, senha } = req.body;
    
    connection.query(
        'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
        [email, senha],
        (error, results) => {
            if (error) {
                console.error('Erro ao consultar no banco de dados: ', error);
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
