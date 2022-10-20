import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./models/index.js";


dotenv.config({ path: "../.env" });

// global.postgress = await postgress.connect();

const port = process.env.BACKEND_PORT || 9091;

const app = express();

db.sequelize.sync();

var corsOptions = {
  origin: `http://localhost:${port}`,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Hello World!");
});

router.get("/smile", async (req, res) => {
  res.status(200).json("Smile, bitch!");
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
