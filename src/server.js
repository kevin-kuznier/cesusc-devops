const express = require('express');
const { soma, subtrai } = require('./calc');

const app = express();
const PORT = process.env.PORT || 3000;

// Pagina inicial - usada na demonstracao via navegador (http://<ip_do_servidor>)
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
      <head><meta charset="utf-8"><title>N3 DevOps</title></head>
      <body>
        <h1 id="titulo">Aplicacao N3 - DevOps</h1>
        <p id="status">Aplicacao rodando com CI/CD!</p>
        <p id="versao">Versao: 1.1.0</p>
        <p id="deploy">Deploy automatico via GitHub Actions na branch main</p>
      </body>
    </html>
  `);
});

// Endpoint de saude - util para verificar deploy
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Endpoint que usa logica testavel
app.get('/soma', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  res.json({ resultado: soma(a, b) });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app;
