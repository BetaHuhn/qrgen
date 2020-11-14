import express from "express";
import bodyParser from "body-parser";
const app = express();
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();

import appRouter from "./router/app";
import { routeLog } from './middleware'
import log from './utils/log'

app.use(routeLog())
app.use(express.static("client/dist"));
app.use(express.json({ limit: "1mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'magic')
  next()
})

const corsOptions = {
  origin: ["https://qrgen.cc", "https://dev.qrgen.cc"],
  methods: ["GET", "OPTIONS", "POST"],
};
app.use(cors(corsOptions));

app.use(appRouter);

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
	if (!err) {
		return next()
	}

	const message = err.message || 'An unkown error ocurred, please try again.'
	const returnStatus = typeof err === 'number' ? err : 400

	log.fatal(`${ returnStatus } - ${ message }`)

	res.status(returnStatus).json({
		status: returnStatus,
		message: message
	})
})

export default app;