"use strict";
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const config = require("./config");
const studentRoutes = require("./routes/student-routes");
const cspRoutes = require("./routes/csp-routes");
const zoomRoutes = require("./routes/zoom-routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api", studentRoutes.routes);
app.use("/api", cspRoutes.routes);
app.use("/api", zoomRoutes.routes);

// //zoom auth, rmb to configure domain url when in prod
// app.get("/zoomauth", async function (req, res) {
//   return res.redirect(
//     encodeURI(
//       `https://zoom.us/oauth/authorize?response_type=code&client_id=DgWlPZgGSrGcJOBMXERH2w&redirect_uri=${encodeURI(
//         "https://smooserve-be.vercel.app/redirect"
//       )}`
//     )
//   );
// });

// // redirect
// app.get("/redirect", async function (req, res) {
//   if (req.query.code) {
//     var data = {
//       code: req.query.code,
//       grant_type: "authorization_code",
//       redirect_uri: "https://smooserve-be.vercel.app/redirect",
//     };

//     var config = {
//       method: "post",
//       url: "https://zoom.us/oauth/token",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//         Authorization:
//           "Basic " +
//           Buffer.from(
//             "DgWlPZgGSrGcJOBMXERH2w:UjVGte9FWBtP3AhzdAjiYXnsyRRHDK2Z"
//           ).toString("base64"),
//       },
//       data: data,
//     };

//     var result = await axios(config)
//       .then(function (response) {
//         console.log(response.data);
//         console.log(response.data.access_token);
//         res.redirect(`http://localhost:5173/#/csp/zoom?access_token=${response.data.access_token}&refresh_token=${response.data.refresh_token}`);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });

//     return res.json(result);
//   }else{
//       res.redirect("https://smooserve-be.vercel.app/zoomauth");
//   }
// });

// // refresh token
// app.get("/refresh", async function (req, res) {
//   var data = {
//     refresh_token:
//       "eyJzdiI6IjAwMDAwMSIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6ImU1MjM3NTVlLTcwY2MtNGIxNC1hNTc1LThlZTUzNGQwNjU2ZiJ9.eyJ2ZXIiOjksImF1aWQiOiJlNWI2NDg5MDRlN2RiZjhkZTJiNDljMTY0MTljYTE5MSIsImNvZGUiOiJyU3duYW1rZ1JYd19HR0Y4M2lLVF82QWdiVlZqWC1uVGciLCJpc3MiOiJ6bTpjaWQ6dE04MnFOWlRUTG1COFM1dlVVeFYyZyIsImdubyI6MCwidHlwZSI6MSwidGlkIjowLCJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiIya1RVT2RCMlFaaUlpWEhJX1hNc2l3IiwibmJmIjoxNjk3NjgxNzM4LCJleHAiOjE3MDU0NTc3MzgsImlhdCI6MTY5NzY4MTczOCwiYWlkIjoieVRXQ2VNdDFSeG1lZFpaZ0l5RHBrZyJ9.9cxEKsjHHL7qGlUXHTGwqA0irfJPKkPbEUx3DLlgRVQFQFVzFJoB4ugG0alqYHudazhSpz3-hxXcG6yElY9ltg",
//     grant_type: "refresh_token",
//     //   redirect_uri: "https://smooserve-be.vercel.app/redirect",
//   };

//   var config = {
//     method: "post",
//     url: "https://zoom.us/oauth/token",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       Authorization:
//         "Basic " +
//         Buffer.from(
//           "tM82qNZTTLmB8S5vUUxV2g:78DcrwC0tkz7aCg6n9zFYhePcJ2Lim7t"
//         ).toString("base64"),
//     },
//     data: data,
//   };

//   var result = await axios(config)
//     .then(function (response) {
//       console.log(response.data);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });

//   return res.json(result);
// });

app.listen(config.port, () =>
  console.log("App is listening on url http://localhost:" + config.port)
);
