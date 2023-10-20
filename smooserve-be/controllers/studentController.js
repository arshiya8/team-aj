'use strict';

const firebase = require('../db');
const Student = require('../models/student');
const firestore = firebase.firestore();


const addStudent = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('students').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllStudents = async (req, res, next) => {
    try {
        const students = await firestore.collection('students');
        const data = await students.get();
        const studentsArray = [];
        if(data.empty) {
            res.status(404).send('No student record found');
        }else {
            data.forEach(doc => {
                const student = new Student(
                    doc.data().id,
                    doc.data().firstName,
                    doc.data().lastName,
                    doc.data().email,
                    doc.data().quizPreference,
                    doc.data().registeredCsps,
                    doc.data().achievements,
                    doc.data().statusOfCompletion,
                );
                studentsArray.push(student);
            });
            res.send(studentsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const student = await firestore.collection('students').doc(id);
        const data = await student.get();
        if(!data.exists) {
            res.status(404).send('Student with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const student =  await firestore.collection('students').doc(id);
        await student.update(data);
        res.send('Student record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('students').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// const updateStudentFavoriteCSPs = async (req, res, next) => {
//     try {
//       const { studentId } = req.params.id;
//       const { favoriteCSPs } = req.body;
//       // Reference to the specific student document in Firestore
//     const studentRef = firestore.collection('students').doc(studentId);

//     // Update the 'favoriteCSPs' field in the student document
//     await studentRef.update({
//       favoriteCsps: favoriteCSPs,
//     });
//       res.status(200).send('Favorite CSPs updated successfully.');
//     } catch (error) {
//       console.error('Error updating favorite CSPs:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   };
  


module.exports = {
    addStudent,
    getAllStudents,
    getStudent,
    updateStudent,
    deleteStudent,
    // updateStudentFavoriteCSPs
}