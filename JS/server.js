const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');  // Importando as rotas

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());  // Usando express.json para processar JSON
app.use(express.static(path.join(__dirname, '../public')));  // Servindo arquivos estáticos da pasta "public"

// Rota para exibir a página de login
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));  // Certifique-se que o caminho está correto
});

// Usando as rotas para o login
app.use('/api', routes);  // Roteamento de API para login

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
