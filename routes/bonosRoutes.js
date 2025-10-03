const express = require('express');
const router = express.Router();
const bonosController = require('../controllers/bonosController');

router.get('/', bonosController.listarBonos);
router.post('/', bonosController.crearBono);



module.exports = router;