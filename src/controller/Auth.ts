
                        
import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../entity/User";
import useTryCatch from "../helpers/useTryCatch";
import { compareSync, hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import createRoute from "../helpers/createRoute"

export class AuthController{

    // Authenticates against the provided user models
private userRepository = getRepository(User)
   
// Basic login with token accepted in verifyToken method of MiddleWare.ts
async login(req: Request, res: Response, next: NextFunction) {
    // Find user from database
    const [user, error] = await useTryCatch(this.userRepository.findOne({ where: { email: req.body.email } }));
    try {
        // Compare provided password with encrypted user password
      if (compareSync(req.body.password, user?.password)) {
        //   Sign a JWT Token with the user details and return token to further authenticate requests
        const token = sign(user, process.env.APP_SECRET);
        return token;
      }
      else res.status(403)
    } catch (e) {
      res.status(403).send(e)
    }
  }
    
//   Basic registration with token accepted in verifyToken method of MiddleWare.ts
  async register(req: Request, res: Response, next: NextFunction) {
    if (!Boolean(req.body.password) || !Boolean(req.body.email)) {
        res.status(403).json({error:"email and password required"})
      } else {
        req.body["password"] = hashSync(req.body.password, 8);
        const [data, error] = await useTryCatch(this.userRepository.save(req.body))
        if(data) return sign(data, process.env.APP_SECRET)
        else res.status(403).json(error)
      }
  }
}

export const AuthRoutes = [
    createRoute("post", "/Login", AuthController, "login"),
    createRoute("post", "/Register", AuthController, "register")
]
                        
                        