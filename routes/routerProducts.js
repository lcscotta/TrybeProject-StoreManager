const express = require('express');

const controllerProducts = require('../controllers/controllerProducts');
const { productsValidation } = require('../middlewares/productsValidation');

const routerProducts = express.Router();

routerProducts.get('/', controllerProducts.getAll);
routerProducts.get('/:id', controllerProducts.getById);
routerProducts.post('/', productsValidation, controllerProducts.add);
routerProducts.put('/:id', productsValidation, controllerProducts.update);
routerProducts.delete('/:id', controllerProducts.remove);

module.exports = routerProducts;
