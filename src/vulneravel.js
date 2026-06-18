const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'senha',
  database: 'empresa'
});

// ============================================================
// EXEMPLO PROPOSITAL DE FALHA - para o SAST (CodeQL) detectar.
// Use isto na demonstracao "simular correcao de falha".
// ============================================================

function buscarUsuario(req, res) {
  const id = req.query.id;

  // VERSAO VULNERAVEL (SQL Injection) - concatena entrada do usuario:
  const sql = 'SELECT * FROM usuarios WHERE id = ' + id;

  // VERSAO CORRIGIDA (descomente para "corrigir a falha" na apresentacao):
  // const sql = 'SELECT * FROM usuarios WHERE id = ?';
  // db.query(sql, [id], (err, results) => { ... });

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.json(results);
  });
}

module.exports = { buscarUsuario };
