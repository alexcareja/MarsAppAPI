"use strict";
exports.__esModule = true;
// import express, { Express } from "express";
var axios = require('axios');
// const expressApp = express();
// const port = 8000;
// expressApp.use(express.json());
// const router = express.Router();
// router.get('/test', (expressRequest: express.Request, expressResponse: express.Response) => {
//     let roverNamesList: string[] = [];
//     axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=IqA8fYkIhjXf62lkAuWM3WqexG4waX0mbovOUeII')
//       .then(function (axiosResponse: AxiosResponse) {
//         for (const rover of axiosResponse["data"]["rovers"]) {
//             roverNamesList.push(rover["name"]);
//         }
//       })
//       .catch(function (error: string) {
//         console.log(error);
//       })
//       .then(function () {
//       });
//       let roverNamesString: string = roverNamesList.join(", ")
//       console.log(roverNamesList);
//       console.log(roverNamesString);
//     expressResponse.send(roverNamesString);
// });
// expressApp.use('/', router);
// expressApp.listen(port, () => {
//   console.log(`Test backend is running on port ${port}`);
// });
// axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=IqA8fYkIhjXf62lkAuWM3WqexG4waX0mbovOUeII')
//   .then(function (response) {
//     for (const rover of response["data"]["rovers"]) {
//         console.log(rover["name"]);
//     }
//     //console.log(response["data"]["rovers"]);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
//   .then(function () {
//   });
var roverNamesList = [];
axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=IqA8fYkIhjXf62lkAuWM3WqexG4waX0mbovOUeII')
    .then(function (axiosResponse) {
    for (var _i = 0, _a = axiosResponse["data"]["rovers"]; _i < _a.length; _i++) {
        var rover = _a[_i];
        console.log(rover["name"]);
        roverNamesList.push(rover["name"]);
    }
    var roverNamesString = roverNamesList.join(", ");
    console.log(roverNamesList);
    console.log(roverNamesString);
})["catch"](function (error) {
    console.log(error);
})
    .then(function () {
});
