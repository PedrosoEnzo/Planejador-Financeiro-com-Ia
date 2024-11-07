app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;
    console.log('Recebido no servidor - Email:', email, 'Senha:', senha); // Adicionado para depuração

    connection.query(
        'SELECT * FROM usuarios WHERE email = ? AND senha = ?',
        [email, senha],
        (error, results) => {
            if (error) {
                console.error('Erro ao consultar no banco de dados:', error); // Log de erro
                return res.status(500).json({ error: 'Erro ao fazer login' });
            }
            console.log('Resultados da consulta:', results); // Log dos resultados da consulta

            if (results.length > 0) {
                return res.status(200).json({ message: 'Login bem-sucedido!' });
            } else {
                console.log('Credenciais inválidas para email:', email); // Log quando as credenciais não corresponderem
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }
        }
    );
});
