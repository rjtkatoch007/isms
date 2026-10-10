import express from "express";
const app = express();
app.use(express.json());

app.get("/", (req, res)=>{
    app.json("Welcome to iSMS APP");
})

app.listen(3000, ()=>{
    console.log("App is running on port 3000");
})
