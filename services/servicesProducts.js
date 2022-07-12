const modelproducts = require('../models/modelProducts');

const getAll = async () => {
  const result = await modelproducts.getAll();
  if (!result) return [];
  return result;
};

const getById = async (id) => {
  const result = await modelproducts.getById(id);
  if (!result) return [];
  return result;
};

const add = async (name) => {
  if (!name) return [];

  const result = await modelproducts.add(name);
  return result;
};

const update = async (id, name) => {
  const result = await modelproducts.update(id, name);
  return result;
};

const remove = async (id) => {
  const result = await modelproducts.remove(id);
  return result;
};

module.exports = { getAll, getById, add, update, remove };