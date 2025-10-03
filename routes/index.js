const express = require('express');
const router = express.Router();
const bonosRoutes = require('./bonosRoutes')
const pacientesRoutes = require('./pacientesRoutes');
const citasRoutes = require('./citasRoutes')

router.use('/pacientes', pacientesRoutes);
router.use('/citas', citasRoutes);
// const exampleRouter = require('./exampleRouter');

// router.use('/example', exampleRouter);

router.use('/bonos', bonosRoutes);
router.use('/medicos', medicosRoutes);


router.get('/', (req, res) => {
  res.send('API CORRIENDO');
});


module.exports = router;