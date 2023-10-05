const express = require('express');
const {addStudent, 
       getAllStudents, 
       getStudent,
       updateStudent,
       deleteStudent
      } = require('../controllers/cspController');

const router = express.Router();

router.post('/csp', addStudent);
router.get('/csps', getAllStudents);
router.get('/csp/:id', getStudent);
router.put('/csp/:id', updateStudent);
router.delete('/csp/:id', deleteStudent);


module.exports = {
    routes: router
}