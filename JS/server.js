const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

app.use(express.static(path.join(__dirname, '../public')));
app.use('/JS', express.static(path.join(__dirname, '../JS')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

// Rota para cadastro de usuário com verificação de duplicidade
app.post('/criarconta', async (req, res) => {
    const { nome, telefone, email, senha, datadenascimento } = req.body;

    if (!nome || !telefone || !email || !senha || !datadenascimento) {
        return res.status(400).send({ success: false, message: 'Todos os campos são obrigatórios.' });
    }

    try {
        // Verifica se o email já está registrado
        const checkEmailQuery = 'SELECT * FROM usuarios WHERE email = ?';
        db.query(checkEmailQuery, [email], async (err, results) => {
            if (err) {
                console.error('Erro ao verificar duplicidade de email:', err);
                return res.status(500).send({ success: false, message: 'Erro no servidor.' });
            }

            if (results.length > 0) {
                return res.status(400).send({ success: false, message: 'Email já registrado.' });
            }

            // Criptografa a senha
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(senha, saltRounds);

            // Insere o usuário no banco de dados com a senha criptografada
            const insertUserQuery = 'INSERT INTO usuarios (nome, telefone, email, senha, datadenascimento, created_at) VALUES (?, ?, ?, ?, ?, NOW())';
            db.query(insertUserQuery, [nome, telefone, email, hashedPassword, datadenascimento], (err, result) => {
                if (err) {
                    console.error('Erro ao cadastrar usuário:', err);
                    return res.status(500).send({ success: false, message: 'Erro ao cadastrar usuário.' });
                }
                res.send({ success: true, message: 'Usuário cadastrado com sucesso!' });
            });
        });
    } catch (err) {
        console.error('Erro ao criptografar a senha:', err);
        res.status(500).send({ success: false, message: 'Erro ao criptografar a senha.' });
    }
});

// Rota de login com verificação de senha criptografada
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const query = 'SELECT * FROM usuarios WHERE email = ?';

    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            return res.status(500).send({ success: false, message: 'Erro no servidor.' });
        }
        
        if (results.length > 0) {
            const user = results[0];
            const passwordMatch = await bcrypt.compare(senha, user.senha);

            if (passwordMatch) {
                res.send({ success: true, message: 'Login bem-sucedido!' });
            } else {
                res.send({ success: false, message: 'Email ou senha incorretos.' });
            }
        } else {
            res.send({ success: false, message: 'Email ou senha incorretos.' });
        }
    });
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
