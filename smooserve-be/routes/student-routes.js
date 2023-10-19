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
router.get('/students', getAllStudents);
router.get('/student/:id', getStudent);
router.put('/student/:id', updateStudent);
router.delete('/student/:id', deleteStudent);
router.post('/students/:studentId/favorite-csps', updateStudentFavoriteCSPs);


module.exports = {
    routes: router
}