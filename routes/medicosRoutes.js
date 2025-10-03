const express = require('express');
const router = express.Router();
const medicosController = require('../controllers/medicosController');

router.get('/', medicosController.listarMedicos);
router.get('/:idMedico', medicosController.listarUnMedico)
router.post('/', medicosController.crearMedico);
router.post('/varios', medicosController.crearVariosMedicos)
router.put('/:idMedico', medicosController.actualizarMedico)


module.exports = router;