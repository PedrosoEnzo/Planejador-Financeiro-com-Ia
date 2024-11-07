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
app.use(express.static(path.join(__dirname, '../public')));  // Servindo arquivos estáticos

// Usando as rotas definidas em routes.js
app.use('/api', routes);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
