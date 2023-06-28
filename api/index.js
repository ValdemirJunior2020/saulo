import express from "express";
import dotenv from "dotenv";
import "./db/database.js"
import cors from "cors";
import UserRouter from "./routes/user.js";

dotenv.config()

 const port = process.env.PORT;
 const app = express()

 app.use (express.json())
 app.use (cors({credentials: true}))
//using routes
 app.use("/api/user", UserRouter)


 app.listen(port, ()=>{
    console.log ("App is running on port:", port);
 })







