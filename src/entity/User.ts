
import { Request, Response, NextFunction } from "express"
import createRoute from "../helpers/createRoute";
import useTryCatch from "../helpers/useTryCatch";
import { PrimaryGeneratedColumn,  Entity, Column, getRepository , OneToMany, JoinTable} from "typeorm"
import Features from "./Features";



@Entity() 
export default class User  {

// ID field of type UUID is included by default on all entities, except if extending another model.
@PrimaryGeneratedColumn("uuid")
id: string;

// User columns
@Column({}) 
email: string

@Column({}) 
firstname: string

@Column({}) 
otherNames: string

@Column({}) 
password: string

// User relations
@OneToMany(() => Features, features => features.user)
@JoinTable()
features: Features[] 



    }

// User Controller can be refactored to another file in the controllers dir.
class UserController {

    // Defines User repository class;
    private uR = getRepository(User);

    // Saves a User or an array or User and returns the same.
    async save(req: Request, res: Response, next: NextFunction) {
        
        const [data, error] = await useTryCatch(this.uR.save(req.body));
        if (data) return data;
        else res.status(403).json(error);
    }

    // Retrieves a single User object of specified parameter id
    async one(req: Request, res: Response, next: NextFunction) {
        const [data, error] = await useTryCatch(this.uR.findOne(req.params.id))
        if (data) return data;
        else res.status(403).json(error);
    }
    
    // Retrieves all User recordes. Takes optional skip=foo&take=bar query params for paginated requests.
    async all(req: Request, res: Response, next: NextFunction) {
        if (Boolean(req.query.take) && Boolean(req.query.skip)){
        // retrieve all User records with pagination query parms
            const [data, error] = await useTryCatch(this.uR.findAndCount({
                take: req.query.take as unknown as number,
                skip: req.body.skip as unknown as number
            }))
            if (data) return data;
            else res.status(403).json(error);
        } 
        else {
        const [data, error] = await useTryCatch(this.uR.find())
        if (data) return data;
        else res.status(403).json(error)
        }
    }
    // Updates and returns specified object. Id to be included in request body.
    async update(req: Request, res: Response, next: NextFunction) {
        
        const [data, error] = await useTryCatch(this.uR.save(req.body))
        if (data) return data;
        else res.status(403).json(error);
    }
    // Deletes record of specified ID and returns status if affected or not
    async delete(req: Request, res: Response, next: NextFunction) {
        const [user, error] = await useTryCatch(this.uR.findOne(req.params.id))
        const [data, err] = await useTryCatch(this.uR.remove(user))
        if (data) return data;
        else res.status(403).json(error)
    }

    
        
    
     async userbyFeatures(req:Request, res:Response, next:NextFunction){
         const [data, error] = await useTryCatch(this.uR.find({where:{features: req.params.id}}))
         if (data) return data;
        else res.status(403).json(error)
     }                           
                                
    
}
        
        // Register User routes here
export const UserRoutes = [
    createRoute("post", "/User", UserController, "save"),
    createRoute("get", "/User", UserController, "all"),
    createRoute("get", "/User/:id", UserController, "one"),
    createRoute("put", "/User", UserController, "update"),
    createRoute("delete", "/User/:id", UserController, "delete"),
createRoute("get", "/UserByFeatures/:id", UserController, "userbyFeatures"),
]
        