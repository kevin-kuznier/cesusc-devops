const express = require('express');
const mysql = require('mysql');

const router = express.Router();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'senha',
  database: 'empresa'
});

// ============================================================
// EXEMPLO PROPOSITAL DE FALHA - para o SAST (CodeQL) detectar.
// A entrada do usuario (req.query.id) chega direto na query SQL,
// criando um fluxo de dados que o CodeQL rastreia e marca como
// SQL Injection. Use na demonstracao "simular correcao de falha".
// ============================================================

router.get('/usuario', (req, res) => {
  const id = req.query.id;

  // VERSAO VULNERAVEL (SQL Injection) - concatena entrada do usuario:
   const sql = 'SELECT * FROM usuarios WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).send(err.message);
    res.json(results);
  });
});

module.exports = router;