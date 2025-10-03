const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');

router.post('/varias', citasController.crearVariasCitas);
router.post('/', citasController.crearCita);

module.exports = router