const express = require('express');
const router = express.Router();
const bonosRoutes = require('./bonosRoutes')



router.use('/bonos', bonosRoutes);


router.get('/', (req, res) => {
  res.send('API CORRIENDO');
});


module.exports = router;