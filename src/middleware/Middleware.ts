
import { NextFunction, Request, Response } from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as jwt from "jsonwebtoken";
import * as nodemailer from "nodemailer";
    
import Mpesa from "../controller/Mpesa"
    

export default class MiddleWare {
            
// All middleware registered here are applied with app.use() function.
apply() {
return [
bodyParser.json(),
cors("*" as any),
this.verifyTokenMiddleWare,
this.socketMiddleWare,
this.emailMiddleWare,
this.mpesaMiddleWare,
]
}

// Basic JWT token verification against APP_SECRET
async verifyTokenMiddleWare(request: Request, response: Response, next: NextFunction) {
    const path = request["originalUrl"]
    if(Boolean(path === "/Login") || Boolean(path === "/Register") || Boolean(path==="/")) return next()
    {
        const token =  request.headers["access_token"] as string;
        if (!Boolean(token) || !token.startsWith("JWT")) {
            return response
              .status(403)
              .json("A valid access token header is required for this request");
            }
          try {
            const tokenParts= token.split(" ")
            const decoded = jwt.verify(tokenParts[1], process.env.APP_SECRET);
            request["user"] = decoded;
          } catch (err) {
            return response.status(401).send({error:"Invalid token"});
          }
    }
      next()
}
    

// Configures Email transpoter middleware with provided host and port credentials. 
async emailMiddleWare(request: Request, response: Response, next: NextFunction) {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT),
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      transporter.verify().then(console.log).catch(console.error);
      request["transporter"] = transporter;
      next();
}
    
    

// Adds socket.io listener to each request for emiting messages.
async socketMiddleWare(request: Request, response: Response, next: NextFunction, {io}:any) {
        request["io"] = io
        next();
}
          
    


    

//   Make requests with request["lipaNaMpesa"](phone, amout).Returns [data, error] array.
async mpesaMiddleWare(request: Request, response: Response, next: NextFunction) {
    const mpesa = Mpesa
    request["lipaNaMpesa"] = Mpesa.requestPayment
    next();
}
    
          
            
async pass(request: Request, response: Response, next: NextFunction) {
    next();
}
    
    
}
        