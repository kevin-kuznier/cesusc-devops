const express = require('express');
const path = require('path'); // Agora vamos usar!
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    // Usando o path.join para resolver o erro 'no-unused-vars'
    // E o ESLint agora vai aceitar o __dirname graças ao ajuste acima
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});