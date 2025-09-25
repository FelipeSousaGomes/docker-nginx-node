const mysql = require('mysql');   
const express = require('express');
const app = express();
const port = 3000;

const config = {
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'nodedb',
  multipleStatements: true // Permite múltiplas instruções SQL em uma única query
};

const connection = mysql.createConnection(config);

// Criar a tabela se não existir
const createTableSQL = `
 DROP TABLE IF EXISTS people;
  CREATE TABLE IF NOT EXISTS people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  )
`;
connection.query(createTableSQL, (err) => {
  if (err) {
    console.error('Erro ao criar tabela:', err);
    return;
  }

  // Inserir o nome "Felipe" após criar a tabela
  const sql = `INSERT INTO people(name) VALUES('Felipe')`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Erro ao inserir:', err);
      return;
    }
    console.log('Inserido com sucesso! ID:', result.insertId);
  });
});

app.get('/', (req, res) => {
  connection.query('SELECT name FROM people', (err, rows) => {
    if (err) {
      res.send('Erro ao buscar nomes');
      return;
    }

    const nomes = rows.map(row => row.name).join(', ');

    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <p>Nomes no banco: ${nomes}</p>
    `);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
