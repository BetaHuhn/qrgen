import express, { NextFunction } from "express";
import bodyParser from "body-parser";
const app = express();
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";

import appRouter from "./router/app";

app.use(morgan("tiny"));
app.use(express.static("client/dist"));
app.use(express.json({ limit: "1mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
var corsOptions = {
  origin: ["https://qrgen.cc", "https://dev.qrgen.cc"],
  methods: ["GET", "OPTIONS", "POST"],
};
app.use(cors(corsOptions));
app.use(appRouter);
app.use(helmet.hidePoweredBy({ setTo: "Nokia 3310" }));


// Error handler
app.use(
  (
    err: number,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (typeof err == "number") res.sendStatus(err);
    else {
      res.json({
        time: +new Date(),
        errorCode: 500,
        error: err,
      });
    }
  }
);

export default app;