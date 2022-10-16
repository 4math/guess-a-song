import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

// global.postgress = await postgress.connect();

const app = express();
const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Hello World!");
});

router.get("/smile", async (req, res) => {
  res.status(200).json("Smile, bitch!");
});

app.use("/api", router);

const port: number | string = process.env.BACKEND_PORT || 9091;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
