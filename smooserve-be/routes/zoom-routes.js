const express = require('express');
const {getZoomAuth, 
       getZoomRedirect, 
       createMeeting
      } = require('../controllers/zoomController');

const router = express.Router();

router.get('/zoomAuth', getZoomAuth);
router.get('/zoomRedirect', getZoomRedirect);
router.post('/createMeeting', createMeeting);


module.exports = {
    routes: router
}