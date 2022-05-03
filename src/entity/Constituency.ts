
import { Request, Response, NextFunction } from "express"
import createRoute from "../helpers/createRoute";
import useTryCatch from "../helpers/useTryCatch";
import {   Entity, Column, getRepository } from "typeorm"


import Region from "./Region"

@Entity() 
export default class Constituency extends Region {


// Constituency columns
@Column({nullable: true,}) 
constituency: string

@Column({nullable: true,}) 
constituen: string

@Column({}) 
county: string

 



    }

// Constituency Controller can be refactored to another file in the controllers dir.
class ConstituencyController {

    // Defines Constituency repository class;
    private cR = getRepository(Constituency);

    // Saves a Constituency or an array or Constituency and returns the same.
    async save(req: Request, res: Response, next: NextFunction) {
        
        const [data, error] = await useTryCatch(this.cR.save(req.body));
        if (data) return data;
        else res.status(403).json(error);
    }

    // Retrieves a single Constituency object of specified parameter id
    async one(req: Request, res: Response, next: NextFunction) {
        const [data, error] = await useTryCatch(this.cR.findOne(req.params.id))
        if (data) return data;
        else res.status(403).json(error);
    }
    
    // Retrieves all Constituency recordes. Takes optional skip=foo&take=bar query params for paginated requests.
    async all(req: Request, res: Response, next: NextFunction) {
        if (Boolean(req.query.take) && Boolean(req.query.skip)){
        // retrieve all Constituency records with pagination query parms
            const [data, error] = await useTryCatch(this.cR.findAndCount({
                take: req.query.take as unknown as number,
                skip: req.body.skip as unknown as number
            }))
            if (data) return data;
            else res.status(403).json(error);
        } 
        else {
        const [data, error] = await useTryCatch(this.cR.find())
        if (data) return data;
        else res.status(403).json(error)
        }
    }
    // Updates and returns specified object. Id to be included in request body.
    async update(req: Request, res: Response, next: NextFunction) {
        
        const [data, error] = await useTryCatch(this.cR.save(req.body))
        if (data) return data;
        else res.status(403).json(error);
    }
    // Deletes record of specified ID and returns status if affected or not
    async delete(req: Request, res: Response, next: NextFunction) {
        const [constituency, error] = await useTryCatch(this.cR.findOne(req.params.id))
        const [data, err] = await useTryCatch(this.cR.remove(constituency))
        if (data) return data;
        else res.status(403).json(error)
    }

    
        
    
    
}
        
        // Register Constituency routes here
export const ConstituencyRoutes = [
    createRoute("post", "/Constituency", ConstituencyController, "save"),
    createRoute("get", "/Constituency", ConstituencyController, "all"),
    createRoute("get", "/Constituency/:id", ConstituencyController, "one"),
    createRoute("put", "/Constituency", ConstituencyController, "update"),
    createRoute("delete", "/Constituency/:id", ConstituencyController, "delete"),
]
        