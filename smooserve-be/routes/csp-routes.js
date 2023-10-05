const express = require('express');
const {addCsp, 
       getAllCsps, 
       getCsp,
       updateCsp,
       deleteCsp
      } = require('../controllers/cspController');

const router = express.Router();

router.post('/csp', addCsp);
router.get('/csps', getAllCsps);
router.get('/csp/:id', getCsp);
router.put('/csp/:id', updateCsp);
router.delete('/csp/:id', deleteCsp);


module.exports = {
    routes: router
}