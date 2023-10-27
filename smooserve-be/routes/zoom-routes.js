const express = require('express');
const {getZoomAuth, 
       getZoomRedirect, 
       createMeeting,
       getMeetings,
       getNewAccessToken
      } = require('../controllers/zoomController');

const router = express.Router();

router.get('/zoomAuth', getZoomAuth);
router.get('/zoomRedirect', getZoomRedirect);
router.post('/createMeeting', createMeeting);
router.post('/getMeetings', getMeetings);
router.get('/getNewAccessToken/:id', getNewAccessToken);


module.exports = {
    routes: router
}