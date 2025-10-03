const express = require('express');
const router = express.Router();

const pacientesRoutes = require('./pacientesRoutes');

router.use('/pacientes', pacientesRoutes);
// const exampleRouter = require('./exampleRouter');

// router.use('/example', exampleRouter);

const medicosRoutes = require('./medicosRoutes');

router.use('/medicos', medicosRoutes);


router.get('/', (req, res) => {
  res.send('API CORRIENDO');
});


module.exports = router;