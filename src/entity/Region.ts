
import { Request, Response, NextFunction } from "express"
import createRoute from "../helpers/createRoute";
import useTryCatch from "../helpers/useTryCatch";
import { PrimaryGeneratedColumn,  Entity, Column, getRepository } from "typeorm"




@Entity() 
export default class Region  {

// ID field of type UUID is included by default on all entities, except if extending another model.
@PrimaryGeneratedColumn("uuid")
id: string;

// Region columns
@Column({nullable: true,}) 
code: number

 


// Spatial fields

// GeoJSON point object, required PostreSQL and PostGIS
@Index({ spatial: true })
@Column({
    type: "geometry",
    nullable: true,
    spatialFeatureType: "MultiPolygon",
})
geometry: MultiPolygon;
                
    }

// Region Controller can be refactored to another file in the controllers dir.
class RegionController {

    // Defines Region repository class;
    private rR = getRepository(Region);

    // Saves a Region or an array or Region and returns the same.
    async save(req: Request, res: Response, next: NextFunction) {
        
        const [data, error] = await useTryCatch(this.rR.save(req.body));
        if (data) return data;
        else res.status(403).json(error);
    }

    // Retrieves a single Region object of specified parameter id
    async one(req: Request, res: Response, next: NextFunction) {
        const [data, error] = await useTryCatch(this.rR.findOne(req.params.id))
        if (data) return data;
        else res.status(403).json(error);
    }
    
    // Retrieves all Region recordes. Takes optional skip=foo&take=bar query params for paginated requests.
    async all(req: Request, res: Response, next: NextFunction) {
        if (Boolean(req.query.take) && Boolean(req.query.skip)){
        // retrieve all Region records with pagination query parms
            const [data, error] = await useTryCatch(this.rR.findAndCount({
                take: req.query.take as unknown as number,
                skip: req.body.skip as unknown as number
            }))
            if (data) return data;
            else res.status(403).json(error);
        } 
        else {
        const [data, error] = await useTryCatch(this.rR.find())
        if (data) return data;
        else res.status(403).json(error)
        }
    }
    // Updates and returns specified object. Id to be included in request body.
    async update(req: Request, res: Response, next: NextFunction) {
        
        const [data, error] = await useTryCatch(this.rR.save(req.body))
        if (data) return data;
        else res.status(403).json(error);
    }
    // Deletes record of specified ID and returns status if affected or not
    async delete(req: Request, res: Response, next: NextFunction) {
        const [region, error] = await useTryCatch(this.rR.findOne(req.params.id))
        const [data, err] = await useTryCatch(this.rR.remove(region))
        if (data) return data;
        else res.status(403).json(error)
    }

    
        
    
    
}
        
        // Register Region routes here
export const RegionRoutes = [
    createRoute("post", "/Region", RegionController, "save"),
    createRoute("get", "/Region", RegionController, "all"),
    createRoute("get", "/Region/:id", RegionController, "one"),
    createRoute("put", "/Region", RegionController, "update"),
    createRoute("delete", "/Region/:id", RegionController, "delete"),
]
        