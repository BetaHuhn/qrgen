import express from "express";
import Short from "../models/model.js";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import generate from "nanoid";
import yxc, { connect } from "@dotvirus/yxc";
import { Regex } from "../utils/regex";
import { sendResult } from "../middleware/middleware";
import status from "../utils/status";
import log from "../utils/log";
const router = express.Router();

const limit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  handler: function (req: express.Request, res: express.Response) {
    log.log(`${req.ip} has exceeded rate limit`);
    res.status(status.TOO_MANY_REQUESTS).send({
      status: status.TOO_MANY_REQUESTS,
      type: "error",
      response: "rate limit exceeded",
      error: {
        text: "rate limit exceeded",
        limit: req.rateLimit.limit,
        current: req.rateLimit.current,
        remaining: req.rateLimit.remaining,
        resetTime: req.rateLimit.resetTime,
      },
    });
  },
  headers: true,
});

router.get(
  "/api/",
  connect({
    query: yxc.object({
      url: yxc.string().notEmpty(),
    }),
  }),
  async (req, res, next) => {
    const reqUrl = <string>req.query.url;
    try {
      log.log(`Checking if short "${reqUrl}" exists...`);
      let short = await Short.findOne({ code: reqUrl });
      if (short) {
        log.log(`short with code ${short.code} found. Updating counter...`);
        // Increment counter in database
        // Make use of mongodb $inc operator to increment the counter to avoid race conditions
        // https://docs.mongodb.com/manual/reference/operator/update/inc/
        await short.updateOne({
          $inc: {
            count: 1,
          },
        });

        log.log(`Redirecting to ${short.url}...`);
        return res.redirect(short.url);
      }

      log.log("No short found");
      sendResult(res, status.NOT_FOUND);
    } catch (error) {
      log.error(error);
      // Using next(error), the error will bubble upwards and be catched by the error handler defined in index.ts
      next(error);
    }
  }
);

router.post(
  "/api/create",
  limit,
  connect({
    body: yxc.object({
      url: yxc.string().regex(Regex.url),
    }),
  }),
  async (req, res, next) => {
    try {
      const url: string = req.body.url;
      log.log(`Checking if "${url}" exists...`);
      const entry = await Short.findOne({ url: url });

      if (entry) {
        log.log("Entry already exists");
        return sendResult(res, status.CONFLICT);
      }

      log.log("Now entry found. Creating new one...");
      const query = {
        _id: new mongoose.Types.ObjectId(),
        code: generate(5),
        count: 0,
        url,
        createdOn: +new Date(),
      };
      log.log("Defining new mongoose-short...");
      const short = new Short(query);
      log.log("Saving short in database...");
      const createdShort = await short.save();

      sendResult(res, {
        code: createdShort.code,
        url: createdShort.url,
      });
    } catch (error) {
      log.error(error);
      next(error);
    }
  }
);

export default router;
