const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql2'); // Adicionei a importação do mysql

// Servir arquivos da pasta `public`
app.use(express.static(path.join(__dirname, '../public')));

// Servir arquivos da pasta `JS`
app.use('/JS', express.static(path.join(__dirname, '../JS')));

// Configuração do middleware para lidar com dados POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@Enzo091207',
    database: 'planejador_financeiro'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL!');
});

// Rota de login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';

    db.query(query, [email, senha], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.send({ success: true, message: 'Login bem-sucedido!' });
        } else {
            res.send({ success: false, message: 'Email ou senha incorretos.' });
        }
    });
});

// Rota para cadastro de usuário
app.post('/criarconta', (req, res) => {
    const { nome, telefone, email, senha, datadenascimento } = req.body;

    // Validar se todos os campos estão preenchidos
    if (!nome || !telefone || !email || !senha || !datadenascimento) {
        return res.status(400).send({ success: false, message: 'Todos os campos são obrigatórios.' });
    }

    // Preparar a query para inserir os dados
    const query = 'INSERT INTO usuarios (nome, telefone, email, senha, datadenascimento, created_at) VALUES (?, ?, ?, ?, ?, NOW())';

    // Executar a query para inserir os dados no banco de dados
    db.query(query, [nome, telefone, email, senha, datadenascimento], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar usuário:', err);
            return res.status(500).send({ success: false, message: 'Erro ao cadastrar usuário.' });
        }
        res.send({ success: true, message: 'Usuário cadastrado com sucesso!' });
    });
});


// Iniciar o servidor
const PORT = 3000; // Adicionei uma variável para definir a porta
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
