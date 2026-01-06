import express from "express";
import router from "./routes/routes.routes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
     
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

// https://autocity-kappa.vercel.app

// http://localhost:5173