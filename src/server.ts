import { AxiosResponse } from 'axios';
import express, { Express } from 'express';
 
const expressApp = express();
const port = 8000;
const axios = require('axios');
const apiKey = 'IqA8fYkIhjXf62lkAuWM3WqexG4waX0mbovOUeII'
enum Camera {
    Fhaz = 'fhaz',
    Rhaz = 'rhaz',
    Mast = 'mast',
    Chemcam = 'chemcam',
    Mahli = 'mahli',
    Mardi = 'mardi',
    Navcam = 'navcam',
    Pancam = 'pancam',
    Minites = 'minites',
}

enum Rover {
    Curiosity = 'curiosity',
    Spirit = 'spirit',
    Opportunity = 'opportunity',
    Perseverance = 'perseverance',
}

function getTest(expressRequest: express.Request, expressResponse: express.Response): void {
    expressResponse.send('Hello wolrd !');
}

function getRovers(expressRequest: express.Request, expressResponse: express.Response): void {
    axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=' + apiKey)
        .then(function (axiosResponse: AxiosResponse) {
            const roverNamesList: string[] = [];
            for (const rover of axiosResponse.data.rovers) {
                roverNamesList.push(rover.name);
            }
            const roverNamesString: string = roverNamesList.join(', ');
            expressResponse.send(roverNamesString);
        })
        .catch(function (error: string) {
            console.log(error);
        })
        .then(function () {
        });
}

function getRoversPhotos(expressRequest: express.Request, expressResponse: express.Response): void {
    axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/' + Rover.Spirit
        + '/photos?sol=341&camera=' + Camera.Pancam + '&api_key=' + apiKey)
        .then(function (axiosResponse: AxiosResponse) {
            let photosUrlsList: string[] = [];
                for (const entry of axiosResponse.data.photos) {
                    photosUrlsList.push(entry.img_src);
                }
            let roverNamesString: string = photosUrlsList.join('\n');
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
    router.get('/rovers/photos', getRoversPhotos);

    return router;
}



expressApp.use(express.json());

const router = initRouter();

expressApp.use('/', router);
 
expressApp.listen(port, () => {
  console.log(`Test backend is running on port ${port}`);
});