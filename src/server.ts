import express from "express";
import { router } from "./router";
 
const expressApp = express();
const port = 8000;


expressApp.use(express.json());

expressApp.use("/", router);
 
expressApp.listen(port, () => {
  console.log(`Test backend is running on port ${port}`);
});