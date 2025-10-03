const express = require('express');
const router = express.Router();
const pacientesController = require('../controllers/pacientesController');

router.get('/', pacientesController.listar);
router.post('/', pacientesController.crear);
router.put('/:id_paciente', pacientesController.actualizar);

module.exports = router;
