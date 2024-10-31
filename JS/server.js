const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tcc'
});

// Conectar ao banco de dados
db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

// Endpoint para cadastrar usuário
app.post('/cadastrar', (req, res) => {
    const { nome, email, senha } = req.body;
    
    // Aqui, você deve hashear a senha antes de armazená-la (usando bcrypt, por exemplo).
    db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha], (err, results) => {
        if (err) return res.status(500).send('Erro ao cadastrar usuário.');
        res.send('Usuário cadastrado com sucesso!');
    });
});

app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).send('Erro no servidor.');
        if (results.length === 0) return res.status(401).send('Usuário não encontrado.');

        const user = results[0];
        
        // Aqui você deve verificar a senha (com bcrypt)
        if (user.senha === senha) { // Substitua pela verificação hasheada
            res.send('Login bem-sucedido!');
        } else {
            res.status(401).send('Senha incorreta.');
        }
    });
});



// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});