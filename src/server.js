const express = require('express');
const { soma, subtrai, multiplica, divide } = require('./calc');

const app = express();
const PORT = process.env.PORT || 3000;

// Pagina inicial - Calculadora (demonstracao via navegador http://<ip_do_servidor>)
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Calculadora DevOps</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #1a2a4f 0%, #2d3748 100%);
            color: #fff;
            padding: 20px;
          }
          .calc {
            background: #1e293b;
            border-radius: 16px;
            padding: 24px;
            width: 320px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.4);
          }
          h1 { font-size: 1.1rem; text-align: center; margin-bottom: 4px; color: #cbd5e1; }
          .sub { text-align: center; font-size: 0.75rem; color: #64748b; margin-bottom: 16px; }
          #display {
            width: 100%;
            height: 64px;
            background: #0f172a;
            border: none;
            border-radius: 10px;
            color: #fff;
            font-size: 2rem;
            text-align: right;
            padding: 0 16px;
            margin-bottom: 14px;
          }
          .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
          button {
            height: 56px;
            border: none;
            border-radius: 10px;
            font-size: 1.25rem;
            cursor: pointer;
            background: #334155;
            color: #fff;
            transition: filter 0.15s;
          }
          button:hover { filter: brightness(1.2); }
          .op { background: #2563eb; }
          .eq { background: #16a34a; grid-column: span 2; }
          .clear { background: #dc2626; }
          .integrantes { margin-top: 18px; text-align: center; font-size: 0.7rem; color: #64748b; }
        </style>
      </head>
      <body>
<<<<<<< HEAD
        <div class="calc">
          <h1>Calculadora DevOps</h1>
          <p class="sub">Deploy continuo via CI/CD - v1.1.0</p>
          <input id="display" type="text" readonly value="0" />
          <div class="grid">
            <button class="clear" onclick="limpar()">C</button>
            <button class="op" onclick="add('/')">/</button>
            <button class="op" onclick="add('*')">x</button>
            <button class="op" onclick="apagar()">&larr;</button>
            <button onclick="add('7')">7</button>
            <button onclick="add('8')">8</button>
            <button onclick="add('9')">9</button>
            <button class="op" onclick="add('-')">-</button>
            <button onclick="add('4')">4</button>
            <button onclick="add('5')">5</button>
            <button onclick="add('6')">6</button>
            <button class="op" onclick="add('+')">+</button>
            <button onclick="add('1')">1</button>
            <button onclick="add('2')">2</button>
            <button onclick="add('3')">3</button>
            <button onclick="add('.')">.</button>
            <button onclick="add('0')">0</button>
            <button class="eq" onclick="calcular()">=</button>
          </div>
          <p class="integrantes">Kevin Kuznier &middot; Diogo Vieira &middot; Lucas Corso</p>
        </div>
        <script>
          const d = document.getElementById('display');
          function add(v) {
            if (d.value === '0' && v !== '.') d.value = '';
            d.value += v;
          }
          function limpar() { d.value = '0'; }
          function apagar() { d.value = d.value.slice(0, -1) || '0'; }
          function calcular() {
            try {
              const r = Function('"use strict"; return (' + d.value + ')')();
              d.value = (r === Infinity || isNaN(r)) ? 'Erro' : r;
            } catch { d.value = 'Erro'; }
          }
        </script>
=======
        <h1 id="titulo">Aplicacao N3 - DevOps</h1>
        <p id="status">Aplicacao rodando com CI/CD!</p>
        <p id="versao">Versao: 1.1.0</p>
        <p id="deploy">Deploy automatico via GitHub Actions na branch main</p>
>>>>>>> 9d52b56a6765f014f67bafad7fa8956f7260e6e4
      </body>
    </html>
  `);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API da calculadora - usada nos testes de unidade
app.get('/calcular', (req, res) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);
  const op = req.query.op;
  let resultado;
  try {
    if (op === 'soma') resultado = soma(a, b);
    else if (op === 'subtrai') resultado = subtrai(a, b);
    else if (op === 'multiplica') resultado = multiplica(a, b);
    else if (op === 'divide') resultado = divide(a, b);
    else return res.status(400).json({ erro: 'Operacao invalida' });
    res.json({ resultado });
  } catch (e) {
    res.status(400).json({ erro: e.message });
  }
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app;
