
import { Request, Response, NextFunction } from "express"
import createRoute from "../helpers/createRoute";
import useTryCatch from "../helpers/useTryCatch";
import {   Entity, Column, getRepository } from "typeorm"


import None from "./None"

@Entity() 
export default class FeatureCategory extends None {


// FeatureCategory columns
@Column({nullable: true,}) 
name: string

@Column({nullable: true,}) 
type: string

 



    }

// FeatureCategory Controller can be refactored to another file in the controllers dir.
class FeatureCategoryController {

    // Defines FeatureCategory repository class;
    private fR = getRepository(FeatureCategory);

    // Saves a FeatureCategory or an array or FeatureCategory and returns the same.
    async save(req: Request, res: Response, next: NextFunction) {
        
        const [data, error] = await useTryCatch(this.fR.save(req.body));
        if (data) return data;
        else res.status(403).json(error);
    }

    // Retrieves a single FeatureCategory object of specified parameter id
    async one(req: Request, res: Response, next: NextFunction) {
        const [data, error] = await useTryCatch(this.fR.findOne(req.params.id))
        if (data) return data;
        else res.status(403).json(error);
    }
    
    // Retrieves all FeatureCategory recordes. Takes optional skip=foo&take=bar query params for paginated requests.
    async all(req: Request, res: Response, next: NextFunction) {
        if (Boolean(req.query.take) && Boolean(req.query.skip)){
        // retrieve all FeatureCategory records with pagination query parms
            const [data, error] = await useTryCatch(this.fR.findAndCount({
                take: req.query.take as unknown as number,
                skip: req.body.skip as unknown as number
            }))
            if (data) return data;
            else res.status(403).json(error);
        } 
        else {
        const [data, error] = await useTryCatch(this.fR.find())
        if (data) return data;
        else res.status(403).json(error)
        }
    }
    // Updates and returns specified object. Id to be included in request body.
    async update(req: Request, res: Response, next: NextFunction) {
        
        const [data, error] = await useTryCatch(this.fR.save(req.body))
        if (data) return data;
        else res.status(403).json(error);
    }
    // Deletes record of specified ID and returns status if affected or not
    async delete(req: Request, res: Response, next: NextFunction) {
        const [featurecategory, error] = await useTryCatch(this.fR.findOne(req.params.id))
        const [data, err] = await useTryCatch(this.fR.remove(featurecategory))
        if (data) return data;
        else res.status(403).json(error)
    }

    
        
    
    
}
        
        // Register FeatureCategory routes here
export const FeatureCategoryRoutes = [
    createRoute("post", "/FeatureCategory", FeatureCategoryController, "save"),
    createRoute("get", "/FeatureCategory", FeatureCategoryController, "all"),
    createRoute("get", "/FeatureCategory/:id", FeatureCategoryController, "one"),
    createRoute("put", "/FeatureCategory", FeatureCategoryController, "update"),
    createRoute("delete", "/FeatureCategory/:id", FeatureCategoryController, "delete"),
]
        