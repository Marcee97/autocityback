import express from "express";
import router from "./routes/routes.routes.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(cookieParser());       // 1 - Primero las cookies
app.use(express.json());       // 2 - Luego JSON
app.use(
  cors({
    origin: "https://autocity-kappa.vercel.app",
    credentials: true
  })
);
app.use("/", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});