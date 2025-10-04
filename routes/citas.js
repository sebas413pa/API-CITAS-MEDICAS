const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');

// ...otras rutas...
router.put('/cambiar-estado/:idCita/:nuevoEstado', citasController.cambiarEstado);

module.exports = router;