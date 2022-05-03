
import { Request, Response, NextFunction } from "express"
import createRoute from "../helpers/createRoute";
import useTryCatch from "../helpers/useTryCatch";
import { Index, getManager, Entity, Column, getRepository ,ManyToOne} from "typeorm"
import User from "./User";
import { Point, } from "geojson";
import None from "./None"

@Entity() 
export default class Features extends None {


// Features columns
@Column({nullable: true,}) 
county: string

@Column({nullable: true,}) 
constituency: string

@Column({nullable: true,}) 
subcounty: string

@Column({nullable: true,}) 
ward: string

// Features relations
@ManyToOne(() => User, user => user.features)
user: User 


// Spatial fields

// GeoJSON point object, required PostreSQL and PostGIS
@Index({ spatial: true })
@Column({
     type: "geometry",
    nullable: true,
    spatialFeatureType: "Point",
})
geometry: Point
                
    }

// Features Controller can be refactored to another file in the controllers dir.
class FeaturesController {

    // Defines Features repository class;
    private fR = getRepository(Features);

    // Saves a Features or an array or Features and returns the same.
    async save(req: Request, res: Response, next: NextFunction) {
        
        if(Boolean(req.body.lng) && Boolean(req.body.lat)){
            // Convert latitude and longitude to GeoJSON point object before. Multiploygons can be imported with shapefiles.
            req["body"]["geometry"] = {
                type:"Point",
                coodinates:[req.body.lng, req.body.lat]
            }
        }
        
        
        const [data, error] = await useTryCatch(this.fR.save(req.body));
        if (data) return data;
        else res.status(403).json(error);
    }

    // Retrieves a single Features object of specified parameter id
    async one(req: Request, res: Response, next: NextFunction) {
        const [data, error] = await useTryCatch(this.fR.findOne(req.params.id))
        if (data) return data;
        else res.status(403).json(error);
    }
    
    // Retrieves all Features recordes. Takes optional skip=foo&take=bar query params for paginated requests.
    async all(req: Request, res: Response, next: NextFunction) {
        if (Boolean(req.query.take) && Boolean(req.query.skip)){
        // retrieve all Features records with pagination query parms
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
        
        if(Boolean(req.body.lng) && Boolean(req.body.lat)){
            // Convert latitude and longitude to GeoJSON point object before. Multiploygons can be imported with shapefiles.
            req["body"]["geometry"] = {
                type:"Point",
                coodinates:[req.body.lng, req.body.lat]
            }
        }
        
        
        const [data, error] = await useTryCatch(this.fR.save(req.body))
        if (data) return data;
        else res.status(403).json(error);
    }
    // Deletes record of specified ID and returns status if affected or not
    async delete(req: Request, res: Response, next: NextFunction) {
        const [features, error] = await useTryCatch(this.fR.findOne(req.params.id))
        const [data, err] = await useTryCatch(this.fR.remove(features))
        if (data) return data;
        else res.status(403).json(error)
    }

    
        lat, lng and rad query params are required
        async byRadiusFeatures(req: Request, res: Response, next: NextFunction) {
            // returns Features(s) points within a given radius. lat, lng and rad query params required
            const data = await getManager()
              .createQueryBuilder(Features, "features")
              .where(
                `ST_DWithin(Features.geometry, ST_MakePoint(${req.params.lat},${req.params.lng})::geography, ${req.params.rad})`
              )
              .getMany();
            return data;
          }
        
        
    
     async featuresbyUser(req:Request, res:Response, next:NextFunction){
         const [data, error] = await useTryCatch(this.fR.find({where:{user: req.params.id}}))
         if (data) return data;
        else res.status(403).json(error)
     }                           
                                
    
}
        
        // Register Features routes here
export const FeaturesRoutes = [
    createRoute("post", "/Features", FeaturesController, "save"),
    createRoute("get", "/Features", FeaturesController, "all"),
    createRoute("get", "/Features/:id", FeaturesController, "one"),
    createRoute("put", "/Features", FeaturesController, "update"),
    createRoute("delete", "/Features/:id", FeaturesController, "delete"),
createRoute("/get", "FeaturesByRadius", FeaturesController, "byRadius"),
createRoute("get", "/FeaturesByUser/:id", FeaturesController, "featuresbyUser"),
]
        