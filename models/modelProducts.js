const connection = require('../helpers/connection');

const getAll = async () => {
  const [rows] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return rows;
};

const getById = async (id) => {
  const [[rows]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return rows;
};

const add = async (name) => {
  const [row] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );
  return {
    id: row.insertId,
    name,
  };
};

const update = async (id, name) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ? ',
    [name, id],
  );
  const [[rows]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return rows;
};

const remove = async (id) => {
  const [row] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return row.affectedRows;
};

module.exports = { getAll, getById, add, update, remove };
