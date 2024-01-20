import { Router } from 'express';
const { check } = require('express-validator');
const { 
    createOrden,
    capturarOrden,
    cancelarOrden 
  } = require('../controllers/paypalController');

const { validarCampos } = require('../middlewares');

const router = Router();

router.post('/crear-orden', [
], createOrden); 

router.get('/capturar-orden', [
  validarCampos,
], capturarOrden); 

router.get('/cancelar-orden', [
  validarCampos,
], cancelarOrden); 

module.exports = router;



