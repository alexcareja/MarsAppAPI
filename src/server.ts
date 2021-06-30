import { AxiosResponse } from "axios";
import express, { Express } from "express";
 
const expressApp = express();
const port = 8000;
const axios = require('axios');

function getTest(expressRequest: express.Request, expressResponse: express.Response): void {
    expressResponse.send("Hello wolrd !");
}

function getRovers(expressRequest: express.Request, expressResponse: express.Response): void {
    axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=IqA8fYkIhjXf62lkAuWM3WqexG4waX0mbovOUeII')
        .then(function (axiosResponse: AxiosResponse) {
        let roverNamesList: string[] = [];
            for (const rover of axiosResponse["data"]["rovers"]) {
                roverNamesList.push(rover["name"]);
            }
        let roverNamesString: string = roverNamesList.join(", ")
        expressResponse.send(roverNamesString);
        })
        .catch(function (error: string) {
            console.log(error);
        })
        .then(function () {
        });
}

function initRouter(): express.Router {
    const router = express.Router();

    router.get('/test', getTest);
    router.get('/rovers', getRovers);

    return router;
}



expressApp.use(express.json());

const router = initRouter();

expressApp.use('/', router);
 
expressApp.listen(port, () => {
  console.log(`Test backend is running on port ${port}`);
});