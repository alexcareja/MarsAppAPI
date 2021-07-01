import axios, { AxiosResponse } from "axios";
import express from "express";
import { Camera } from "./cameras";
import { Rover } from "./rovers";

const apiKey = "IqA8fYkIhjXf62lkAuWM3WqexG4waX0mbovOUeII"

function getRovers(): Promise<string> {
    return axios.get("https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=" + apiKey)
        .then((axiosResponse: AxiosResponse) => {
            const roverNamesList: string[] = [];
            for (const rover of axiosResponse.data.rovers) {
                roverNamesList.push(rover.name);
            }
            const roverNamesString: string = roverNamesList.join(", ");
            return roverNamesString;
        })
        .catch(function (error: string) {
            console.log(error);
            throw error;
        })
}

function getRoversPhotos(): Promise<string> {
    return axios.get("https://api.nasa.gov/mars-photos/api/v1/rovers/" + Rover.Opportunity
        + "/photos?sol=121&camera=" + Camera.Fhaz + "&api_key=" + apiKey)
        .then((axiosResponse: AxiosResponse) => {
            const photosUrlsList: string[] = [];
            for (const entry of axiosResponse.data.photos) {
                photosUrlsList.push(entry.img_src);
            }
            return photosUrlsList.join(" ");
        })
        .catch(function (error: string) {
            console.log(error);
            throw error;
        })
}

function getRoversPhotosGeneric(roverName: string, cameraName: string): Promise<string> {
    return axios.get("https://api.nasa.gov/mars-photos/api/v1/rovers/" + roverName
        + "/photos?sol=121&camera=" + cameraName + "&api_key=" + apiKey)
        .then((axiosResponse: AxiosResponse) => {
            const photosUrlsList: string[] = [];
            for (const entry of axiosResponse.data.photos) {
                photosUrlsList.push(entry.img_src);
            }
            return photosUrlsList.join(" \r\n");
        })
        .catch(function (error: string) {
            console.log(error);
            throw error;
        });
}

const router = express.Router();

router.get("/test", (expressRequest: express.Request, expressResponse: express.Response) => {
    expressResponse.send("Hello wolrd !");
});

router.get("/rovers", (expressRequest: express.Request, expressResponse: express.Response) => {
    getRovers()
        .then((roversListString) => {
            expressResponse.send(roversListString);
        });

router.get("/rovers/photos", (expressRequest: express.Request, expressResponse: express.Response) => {
    getRoversPhotos()
        .then((photosUrlsListString) => {
            expressResponse.send(photosUrlsListString);
        });

router.get("/rovers/:rover/photos/:camera", (expressRequest: express.Request, expressResponse: express.Response) => {
    getRoversPhotosGeneric(expressRequest.params.rover, expressRequest.params.camera)
        .then((photosUrlsListString) => {
            expressResponse.send(photosUrlsListString);
        });
});

export { router }