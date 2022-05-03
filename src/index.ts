   
// App startup script
import GISKEApp from "./giske/giske";

//Custom and imported middleware can be added or modified in this file. 
import MiddleWare from "./middleware/Middleware";
        
// entity routes are registered here as an array.
import { Routes } from "./routes";
        
        
GISKEApp.run({
    routes: Routes,
    middleware: new MiddleWare().apply(),
    port: process.env.PORT || 7072,
});
        
        