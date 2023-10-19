const express = require('express');
const {addStudent, 
       getAllStudents, 
       getStudent,
       updateStudent,
       deleteStudent, 
       updateStudentFavoriteCSPs
      } = require('../controllers/studentController');

const router = express.Router();

router.post('/student', addStudent);
router.post('/student/:id', updateStudentFavoriteCSPs);
router.get('/students', getAllStudents);
router.get('/student/:id', getStudent);
router.put('/student/:id', updateStudent);
router.delete('/student/:id', deleteStudent);



module.exports = {
    routes: router
}