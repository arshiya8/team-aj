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
const getNewAccessToken = async (req, res) => {
    var data = {
        grant_type: "refresh_token",
        refresh_token: req.params.id,
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
        console.log("NEW TOKEN" + response.data);
        // res.redirect(
        //   `http://localhost:5173/#/csp/zoom?&access_token=${response.data.access_token}&refresh_token=${response.data.refresh_token}`
        // );
        return response.data
      })
      .catch(function (error) {
        console.log(error);
      });

    return res.json(result);
};

const createMeeting = async (req, res) => {
  try {
    const data = req.body;

    const apiUrl = "https://api.zoom.us/v2/users/me/meetings"; // Zoom API endpoint
    const meetingData = {
      topic: data.topic, // Meeting title
      type: 2, // Scheduled meeting
      start_time: data.start_time, // Set your desired start time
      duration: data.duration, // Meeting duration in minutes
      timezone: 'Asia/Singapore'
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

const getMeetings = async (req, res) => {
  try {
    const data = req.body;

    const apiUrl = "https://api.zoom.us/v2/users/me/meetings"; // Zoom API endpoint

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.accessToken}`, // Include the access token
    };

    // Make an authenticated POST request to create the meeting
    const response = await axios.get(apiUrl, { headers });

    if (response.status === 201) {
      const meetings = response.data;
      res.send(meetings);
    } else {
        // Handle any errors or validation issues
        res.status(response.status).send(response.data);
    }
  } catch (error) {
    console.error("Error creating Zoom meeting:", error);
    res.send(error);
  }
};

module.exports = {
  getZoomAuth,
  getZoomRedirect,
  getNewAccessToken,
  createMeeting,
  getMeetings
};
