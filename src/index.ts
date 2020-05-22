import express, { NextFunction } from "express";
import bodyParser from "body-parser";
const app = express();
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();
import { connectDatabase } from "./database/database";
import morgan from "morgan";
import log from "./utils/log";

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

/**
 * Connect to database and listen to given port
 */
async function startServer() {
  try {
    await connectDatabase();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => log.log("listening on port " + PORT));
  } catch (error) {
    log.error("Server setup failed. Wrong server IP or authentication?");
    log.error(error);
    process.exit(1);
  }
}
startServer();

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
