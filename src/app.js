const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

// O endpoint deve retornar o arquivo dentro da pasta views
app.get('/', (req, res) => {
  // Se o app.js estiver na pasta 'src', o caminho abaixo funcionará:
  res.sendFile('views/index.html', { root: __dirname });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});