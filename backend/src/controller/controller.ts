import { Request, Response, NextFunction } from "express";
import Model from "../model/model";
import View from "../view/view";

export default class Controller {

    /**
     * Inject the Model and View, calls them to getDeltas. If there's none, return an error.
     * @param {Model} m - Model Layer 
     * @param {View} v - View Layer
     * @returns {Response} delta endpoint response
     */
    public getDeltas(m: Model, v: View) {
        return async function(req: Request, res: Response, next: NextFunction) {
            const deltas = await m.getDeltas();
            if (!deltas.length) return res.json({ error: "No deltas found."});
            const data = v.getDeltas(deltas);
            console.log(data);
            res.json({ deltas: data });
        }
    }

    /**
     * Inject the Model and View, calls them to getSnapshot. If there's none, return an error.
     * @param {Model} m - Model Layer 
     * @param {View} v - View Layer
     * @returns {Response} snapshot endpoint response
     */
    public getSnapshot(m: Model, v: View) {
        return async function(req: Request, res: Response, next: NextFunction) {
            const snapshot = await m.getSnapshot();
            if (!snapshot.length) return res.json({ error: "No snapshot found."});
            const data = v.getSnapshot(snapshot);
            console.log(data);
            res.json({ snapshot: data });            
        }
    }
}