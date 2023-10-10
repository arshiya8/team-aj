'use strict';

const firebase = require('../db');
const Csp = require('../models/csp');
const firestore = firebase.firestore();


const addCsp = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('CSPs').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllCsps = async (req, res, next) => {
    try {
        const csps = await firestore.collection('CSPs');
        const data = await csps.get();
        const cspsArray = [];
        if(data.empty) {
            res.status(404).send('No CSP record found');
        }else {
            data.forEach(doc => {
                const csp = new Csp(
                    doc.id,
                    doc.data().title,
                    doc.data().desc,
                    doc.data().imageURL,
                    doc.data().igURL,
                    doc.data().telehandle,
                    doc.data().signupFormURL,
                    doc.data().signupDeadline,
                    doc.data().isLocal,
                    doc.data().noOfHours,
                    doc.data().causes,
                    doc.data().skills,
                    doc.data().settings,
                );
                cspsArray.push(csp);
            });
            res.send(cspsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getCsp = async (req, res, next) => {
    try {
        const id = req.params.id;
        const csp = await firestore.collection('CSPs').doc(id);
        const data = await csp.get();
        if(!data.exists) {
            res.status(404).send('CSP with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateCsp = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const csp =  await firestore.collection('CSPs').doc(id);
        await csp.update(data);
        res.send('CSP record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteCsp = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('CSPs').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addCsp,
    getAllCsps,
    getCsp,
    updateCsp,
    deleteCsp
}