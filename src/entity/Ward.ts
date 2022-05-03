
import { Request, Response, NextFunction } from "express"
import createRoute from "../helpers/createRoute";
import useTryCatch from "../helpers/useTryCatch";
import {   Entity, Column, getRepository } from "typeorm"


import Region from "./Region"

@Entity() 
export default class Ward extends Region {


// Ward columns
@Column({nullable: true,}) 
ward: string

@Column({nullable: true,}) 
county: string

@Column({nullable: true,}) 
constituency: string

 



    }

// Ward Controller can be refactored to another file in the controllers dir.
class WardController {

    // Defines Ward repository class;
    private wR = getRepository(Ward);

    // Saves a Ward or an array or Ward and returns the same.
    async save(req: Request, res: Response, next: NextFunction) {
        
        const [data, error] = await useTryCatch(this.wR.save(req.body));
        if (data) return data;
        else res.status(403).json(error);
    }

    // Retrieves a single Ward object of specified parameter id
    async one(req: Request, res: Response, next: NextFunction) {
        const [data, error] = await useTryCatch(this.wR.findOne(req.params.id))
        if (data) return data;
        else res.status(403).json(error);
    }
    
    // Retrieves all Ward recordes. Takes optional skip=foo&take=bar query params for paginated requests.
    async all(req: Request, res: Response, next: NextFunction) {
        if (Boolean(req.query.take) && Boolean(req.query.skip)){
        // retrieve all Ward records with pagination query parms
            const [data, error] = await useTryCatch(this.wR.findAndCount({
                take: req.query.take as unknown as number,
                skip: req.body.skip as unknown as number
            }))
            if (data) return data;
            else res.status(403).json(error);
        } 
        else {
        const [data, error] = await useTryCatch(this.wR.find())
        if (data) return data;
        else res.status(403).json(error)
        }
    }
    // Updates and returns specified object. Id to be included in request body.
    async update(req: Request, res: Response, next: NextFunction) {
        
        const [data, error] = await useTryCatch(this.wR.save(req.body))
        if (data) return data;
        else res.status(403).json(error);
    }
    // Deletes record of specified ID and returns status if affected or not
    async delete(req: Request, res: Response, next: NextFunction) {
        const [ward, error] = await useTryCatch(this.wR.findOne(req.params.id))
        const [data, err] = await useTryCatch(this.wR.remove(ward))
        if (data) return data;
        else res.status(403).json(error)
    }

    
        
    
    
}
        
        // Register Ward routes here
export const WardRoutes = [
    createRoute("post", "/Ward", WardController, "save"),
    createRoute("get", "/Ward", WardController, "all"),
    createRoute("get", "/Ward/:id", WardController, "one"),
    createRoute("put", "/Ward", WardController, "update"),
    createRoute("delete", "/Ward/:id", WardController, "delete"),
]
        