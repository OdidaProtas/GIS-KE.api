
import "reflect-metadata";
import * as dotenv from "dotenv";
                    
                         
import { Request, Response } from "express";
import { createConnection } from "typeorm";
import * as express from "express";

// Configures app environment variables
dotenv.config();


// This is GISKE App Start script that maps all your routes to conroller actions. Do not edit,

export default class GISKEApp {
                
static run({ routes, admin, docs, middleware, port }: any): void {
    
    // Create a databse connection with ormconfig.js options
    createConnection()
    .then(async(connection) => {
    
    // Create a new Express app
    const app = express();
    const http = require("http");
    const server = http.createServer(app)

         
    //  Create Socket.io server and bind to GISKE server for realtime communication
     const io = require("socket.io")(server, {
        cors: {
          origin: "*",
          methods: ["GET", "POST"],
        },
      });
         
    //   Registers all middleware in apply method of Middleware.ts file
    middleware.forEach((middleWare: any) => {
         app.use((req, res, next) => middleWare(req, res, next, { server, app, io }))
    })

    // Maps all app routes to controller actions
    routes.concat(admin || []).concat(docs || []).forEach((route: any) => {
        (app as any)[route.method](
            route.route,
            (req: Request, res: Response, next: Function) => {
                const result = new(route.controller as any)()[route.action](
            req,
            res,
            next
        );
        if (result instanceof Promise) {
            result.then((result) =>
               result !== null && result !== undefined ?
                route.view ? res.sendFile(route.view) : res.send(result) :
                undefined
            );
        } else if (result !== null && result !== undefined) {
            if (route.view) {
                res.sendFile(route.view);
                                    } else {
                res.json(result)
               }
           }
            }
        );
    });

    // App index route, 
     app.get("/", (req, res) => {
         res.json(" GISKE  Server running on port: " + port);
    });

    // Start listening to incoming requests
    server.listen(port);

    console.log("Server has started on port: " + port);
    
        })
.catch((error) => console.log(error));
}}
     
                