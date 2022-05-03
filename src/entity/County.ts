
import { Request, Response, NextFunction } from "express"
import createRoute from "../helpers/createRoute";
import useTryCatch from "../helpers/useTryCatch";
import { PrimaryGeneratedColumn,  Entity, Column, getRepository } from "typeorm"




@Entity() 
export default class County  {

// ID field of type UUID is included by default on all entities, except if extending another model.
@PrimaryGeneratedColumn("uuid")
id: string;

// County columns
@Column({}) 
county: string

 



    }

// County Controller can be refactored to another file in the controllers dir.
class CountyController {

    // Defines County repository class;
    private cR = getRepository(County);

    // Saves a County or an array or County and returns the same.
    async save(req: Request, res: Response, next: NextFunction) {
        
        const [data, error] = await useTryCatch(this.cR.save(req.body));
        if (data) return data;
        else res.status(403).json(error);
    }

    // Retrieves a single County object of specified parameter id
    async one(req: Request, res: Response, next: NextFunction) {
        const [data, error] = await useTryCatch(this.cR.findOne(req.params.id))
        if (data) return data;
        else res.status(403).json(error);
    }
    
    // Retrieves all County recordes. Takes optional skip=foo&take=bar query params for paginated requests.
    async all(req: Request, res: Response, next: NextFunction) {
        if (Boolean(req.query.take) && Boolean(req.query.skip)){
        // retrieve all County records with pagination query parms
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
        const [county, error] = await useTryCatch(this.cR.findOne(req.params.id))
        const [data, err] = await useTryCatch(this.cR.remove(county))
        if (data) return data;
        else res.status(403).json(error)
    }

    
        
    
    
}
        
        // Register County routes here
export const CountyRoutes = [
    createRoute("post", "/County", CountyController, "save"),
    createRoute("get", "/County", CountyController, "all"),
    createRoute("get", "/County/:id", CountyController, "one"),
    createRoute("put", "/County", CountyController, "update"),
    createRoute("delete", "/County/:id", CountyController, "delete"),
]
        