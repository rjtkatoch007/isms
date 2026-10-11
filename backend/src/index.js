import express from "express";
import cors from "cors";
import { clerkMiddleware } from '@clerk/express'
import "dotenv/config"

import { connectDB } from "./lib/db.js";
const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(express.json());
app.use(cors({origin: FRONTEND_URL, credentials: true}));
app.use(clerkMiddleware())

app.get("/", (req, res)=>{
    res.json({message: "Welcome to iSMS APP"});
})

// Start the server and listen on the specified port
app.listen(PORT, ()=>{
    connectDB();
    console.log(`isms app listening at http://localhost:${PORT}`)
})
