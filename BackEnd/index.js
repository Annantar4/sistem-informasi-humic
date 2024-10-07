import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import db from "./config/database.js";    
import User from "./model/userModel.js";
import Home from "./model/homeModel.js";
import router from "./route/homeRoute.js";
import { fileURLToPath } from 'url';
dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url); // Mendapatkan nama file
const __dirname = path.dirname(__filename); // Mendapatkan direktori
app.use(cors({
    origin: "*"
}))

// try {
//     await db.authenticate();
//     console.log("DB Connected");
//     await User.sync();
//     await Home.sync();
// } catch (error) {
//     console.log(error);
// }

// (async()=>{
//     await db.sync();
// })();

app.use(express.json());
app.use(router);
app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.listen(process.env.PORT,()=>{
    console.log("Server Running");
})