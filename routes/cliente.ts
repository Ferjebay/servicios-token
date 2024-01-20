import { Router } from 'express';
const { check } = require('express-validator');
const { agregarCliente } = require('../controllers/clienteController');

const { validarCampos } = require('../middlewares');

const router = Router();

router.post('/agregar-cliente', [
  validarCampos
], agregarCliente); 

module.exports = router;



