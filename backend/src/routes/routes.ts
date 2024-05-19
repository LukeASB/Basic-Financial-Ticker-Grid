import { Request, Response, NextFunction, Router } from "express";
import Controller from "../controller/controller";
import View from "../view/view";
import Model from "../model/model";

export default class Routes {
    constructor(public controller: Controller, public model: Model, public view: View) {
        this.controller = controller;
        this.model = model;
        this.view = view;
    }

    /**
     * Defines the Express Web Service's Routes.
     * @param appName string
     * @param router Express.Router
     */
    public appRoutes(appName: string, router: Router) {
        router.get("/", (req: Request, res: Response, next: NextFunction) => res.json({ appName: `${appName}`, endpoints: `/getDeltas, /getSnapshot`}));
        router.get("/getDeltas", this.controller.getDeltas(this.model, this.view));
        router.get("/getSnapshot", this.controller.getSnapshot(this.model, this.view));        
    }
}