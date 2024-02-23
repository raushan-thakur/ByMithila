import express from "express";
import colors from 'colors';
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from "url";
//configure env
dotenv.config();

//databse config
connectDB();
//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productsRoutes);
app.use(express.static(path.join(__dirname, './client/build')))
//rest api
app.use("*",function(req,res){
     res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//PORT
const PORT =  process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MOD} mode on port ${PORT}`.bgCyan
      .white
  );
});