import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import SequalizeInstance from "./models/index.js";
import Router from "./routes/index.js";

dotenv.config({ path: "../.env" });

const port = process.env.BACKEND_PORT || 9091;

const app = express();

SequalizeInstance.sync();

// Application middlewares
var corsOptions = {
  origin: `http://localhost:${port}`,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", Router);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
