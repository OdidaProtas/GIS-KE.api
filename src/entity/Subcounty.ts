
import { Request, Response, NextFunction } from "express"
import createRoute from "../helpers/createRoute";
import useTryCatch from "../helpers/useTryCatch";
import { PrimaryGeneratedColumn,  Entity, Column, getRepository } from "typeorm"




@Entity() 
export default class Subcounty  {

// ID field of type UUID is included by default on all entities, except if extending another model.
@PrimaryGeneratedColumn("uuid")
id: string;

// Subcounty columns
@Column({nullable: true,}) 
county: string

@Column({}) 
subcounty: string

 



    }

// Subcounty Controller can be refactored to another file in the controllers dir.
class SubcountyController {

    // Defines Subcounty repository class;
    private sR = getRepository(Subcounty);

    // Saves a Subcounty or an array or Subcounty and returns the same.
    async save(req: Request, res: Response, next: NextFunction) {
        
        const [data, error] = await useTryCatch(this.sR.save(req.body));
        if (data) return data;
        else res.status(403).json(error);
    }

    // Retrieves a single Subcounty object of specified parameter id
    async one(req: Request, res: Response, next: NextFunction) {
        const [data, error] = await useTryCatch(this.sR.findOne(req.params.id))
        if (data) return data;
        else res.status(403).json(error);
    }
    
    // Retrieves all Subcounty recordes. Takes optional skip=foo&take=bar query params for paginated requests.
    async all(req: Request, res: Response, next: NextFunction) {
        if (Boolean(req.query.take) && Boolean(req.query.skip)){
        // retrieve all Subcounty records with pagination query parms
            const [data, error] = await useTryCatch(this.sR.findAndCount({
                take: req.query.take as unknown as number,
                skip: req.body.skip as unknown as number
            }))
            if (data) return data;
            else res.status(403).json(error);
        } 
        else {
        const [data, error] = await useTryCatch(this.sR.find())
        if (data) return data;
        else res.status(403).json(error)
        }
    }
    // Updates and returns specified object. Id to be included in request body.
    async update(req: Request, res: Response, next: NextFunction) {
        
        const [data, error] = await useTryCatch(this.sR.save(req.body))
        if (data) return data;
        else res.status(403).json(error);
    }
    // Deletes record of specified ID and returns status if affected or not
    async delete(req: Request, res: Response, next: NextFunction) {
        const [subcounty, error] = await useTryCatch(this.sR.findOne(req.params.id))
        const [data, err] = await useTryCatch(this.sR.remove(subcounty))
        if (data) return data;
        else res.status(403).json(error)
    }

    
        
    
    
}
        
        // Register Subcounty routes here
export const SubcountyRoutes = [
    createRoute("post", "/Subcounty", SubcountyController, "save"),
    createRoute("get", "/Subcounty", SubcountyController, "all"),
    createRoute("get", "/Subcounty/:id", SubcountyController, "one"),
    createRoute("put", "/Subcounty", SubcountyController, "update"),
    createRoute("delete", "/Subcounty/:id", SubcountyController, "delete"),
]
        