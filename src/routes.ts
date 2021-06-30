import { AxiosResponse } from "axios";
import express, { Express } from "express";

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