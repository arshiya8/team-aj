"use strict";

const firebase = require("../db");
const Csp = require("../models/csp");
const axios = require("axios");
const firestore = firebase.firestore();

//zoom auth, rmb to configure domain url when in prod
const getZoomAuth = async (req, res) => {
  try {
    return res.redirect(
      encodeURI(
        `https://zoom.us/oauth/authorize?response_type=code&client_id=DgWlPZgGSrGcJOBMXERH2w&redirect_uri=${encodeURI(
          "http://localhost:8080/api/zoomRedirect"
        )}`
      )
    );
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getZoomRedirect = async (req, res) => {
  if (req.query.code) {
    var data = {
      code: req.query.code,
      grant_type: "authorization_code",
      redirect_uri: "http://localhost:8080/api/zoomRedirect",
    };

    var config = {
      method: "post",
      url: "https://zoom.us/oauth/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          Buffer.from(
            "DgWlPZgGSrGcJOBMXERH2w:UjVGte9FWBtP3AhzdAjiYXnsyRRHDK2Z"
          ).toString("base64"),
      },
      data: data,
    };

    var result = await axios(config)
      .then(function (response) {
        console.log(response.data);
        res.redirect(
          `http://localhost:5173/#/csp/zoom?&access_token=${response.data.access_token}&refresh_token=${response.data.refresh_token}`
        );
      })
      .catch(function (error) {
        console.log(error);
      });

    return res.json(result);
  } else {
    res.redirect(
      encodeURI(
        `https://zoom.us/oauth/authorize?response_type=code&client_id=DgWlPZgGSrGcJOBMXERH2w&redirect_uri=${encodeURI(
          "http://localhost:8080/api/zoomRedirect"
        )}`
      )
    );
  }
};

const createMeeting = async (req, res) => {
  try {
    const data = req.body;

    const apiUrl = "https://api.zoom.us/v2/users/me/meetings"; // Zoom API endpoint
    const meetingData = {
      topic: "My Scheduled Meeting", // Meeting title
      type: 2, // Scheduled meeting
      start_time: "2023-12-31T12:00:00", // Set your desired start time
      duration: 60, // Meeting duration in minutes
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.accessToken}`, // Include the access token
    };

    // Make an authenticated POST request to create the meeting
    const response = await axios.post(apiUrl, meetingData, { headers });

    if (response.status === 201) {
      const meetingInfo = response.data;
      res.send(meetingInfo);
    } else {
        // Handle any errors or validation issues
        throw new Error("Failed to create the Zoom meeting");
    }
  } catch (error) {
    console.error("Error creating Zoom meeting:", error);
    res.send(error);
    throw error;
  }
};

const getAllCsps = async (req, res, next) => {
  try {
    const csps = await firestore.collection("CSPs");
    const data = await csps.get();
    const cspsArray = [];
    if (data.empty) {
      res.status(404).send("No CSP record found");
    } else {
      data.forEach((doc) => {
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
          doc.data().settings
        );
        cspsArray.push(csp);
      });
      res.send(cspsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getCsp = async (req, res, next) => {
  try {
    const id = req.params.id;
    const csp = await firestore.collection("CSPs").doc(id);
    const data = await csp.get();
    if (!data.exists) {
      res.status(404).send("CSP with the given ID not found");
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateCsp = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const csp = await firestore.collection("CSPs").doc(id);
    await csp.update(data);
    res.send("CSP record updated successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteCsp = async (req, res, next) => {
  try {
    const id = req.params.id;
    await firestore.collection("CSPs").doc(id).delete();
    res.send("Record deleted successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getZoomAuth,
  getZoomRedirect,
  createMeeting,
  getCsp,
  updateCsp,
  deleteCsp,
};
