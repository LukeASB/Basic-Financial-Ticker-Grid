import config from "config"
import express, { Express, Request, Response, NextFunction } from "express";
import Controller from "./controller/controller";
import Routes from "./routes/routes";
import Model from "./model/model";
import View from "./view/view";

const app = express();
const name: string = config.get("name");
const port = config.get("port");

const model = new Model(config.get("snapshotFile"), config.get("deltasFile"));
const view = new View;
const controller = new Controller;
const routes = new Routes(controller, model, view);

const router = express.Router();
routes.appRoutes(name, router)

app.use((req: Request, res: Response, next: NextFunction) => {    
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
app.use(router);

app.listen(port, () => {
    console.log(`Executing ${name}. Server is listening on: http://localhost:${port}`);
})