const express = require('express');
const router = express.Router();
const bonosRoutes = require('./bonosRoutes')
const medicosRoutes = require('./medicosRoutes');
const pacientesRoutes = require('./pacientesRoutes');

router.use('/pacientes', pacientesRoutes);
router.use('/bonos', bonosRoutes);
router.use('/medicos', medicosRoutes);


router.get('/', (req, res) => {
  res.send('API CORRIENDO');
});


module.exports = router;