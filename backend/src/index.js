import express from "express";
import cors from "cors";
import { clerkMiddleware } from '@clerk/express'
import "dotenv/config"
import fs from "fs";
import path from "path";

import { connectDB } from "./lib/db.js";
const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

const publicDir = path.join(process.cwd(), "public");

app.use(express.json());
app.use(cors({origin: FRONTEND_URL, credentials: true}));
app.use(clerkMiddleware())

app.get("/health", (req, res)=>{
    res.status(200).json({ok: true});
});
//if the public directory exists, serve the static files
//this is for the production build
if(fs.existsSync(publicDir)){
    app.use(express.static(publicDir))
    app.get("/{*any}", (req, res, next)=>{
        res.sendFile(path.join(publicDir, "index.html"), (err)=>next(err)); 
    })
}

// Start the server and listen on the specified port
app.listen(PORT, ()=>{
    connectDB();
    console.log(`isms app listening at http://localhost:${PORT}`)

    if(process.env.NODE_ENV === "production") job.start();
})
