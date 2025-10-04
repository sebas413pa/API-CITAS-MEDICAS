const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');

router.get('/', citasController.listarCitas);
router.get('/:id_cita', citasController.obtenerCitaPorId);
router.post('/varias', citasController.crearVariasCitas);
router.post('/', citasController.crearCita);
router.put('/:idCita/:nuevoEstado', citasController.cambiarEstado);

module.exports = router