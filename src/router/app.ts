import express from "express";
import Short from "../models/model";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import generate from "nanoid";
import yxc, { connect } from "@dotvirus/yxc";
import { Regex } from "../utils/regex";
import { sendResult } from "../middleware/middleware";
import status from "../utils/status";
import log from "../utils/log";
import fs from "fs";
import { randomWord, randomColor } from "../utils/random";
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
      code: yxc.string().notEmpty(),
    }),
  }),
  async (req, res, next) => {
    const code = <string>req.query.code;
    try {
      log.log(`Checking if short "${code}" exists...`);
      let short = await Short.findOne({ code: code });
      if (short) {
        log.log(`short with code ${short.code} found. Updating counter...`);
        await short.updateOne({
          $inc: {
            count: 1,
          },
        });

        log.log(`Redirecting to ${short.url}...`);
        return sendResult(res, {
          code: short.code,
          url: short.url,
        }, 200);
      }

      log.log("No short found");
      sendResult(res, 'not found', status.NOT_FOUND);
    } catch (error) {
      log.error(error);
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
      human: yxc.boolean().optional(),
    }),
  }),
  async (req, res, next) => {
    try {
      const url: string = req.body.url;
      log.log(`Checking if "${url}" exists...`);
      const entry = await Short.findOne({ url: url });

      if (entry) {
        log.log("Entry already exists");
        return sendResult(res, {
          code: entry.code,
          url: entry.url,
        }, 200);
      }

      let code;
      if(req.body.human === true ||req.body.human.toString().toLowerCase() === 'true'){
        log.log("Using human readable format as code")
        code = randomColor() + '-' + randomWord()
      }else{
        code = generate(5);
      }

      log.log("No entry found. Creating new one...");
      const query = {
        _id: new mongoose.Types.ObjectId(),
        code,
        count: 0,
        url,
        addedAt: +new Date(),
      };

      log.log("Defining new mongoose-short...");
      const short = new Short(query);

      log.log("Saving short in database...");
      const createdShort = await short.save();

      sendResult(res, {
        code: createdShort.code,
        url: createdShort.url,
      }, 200);
    } catch (error) {
      log.error(error);
      next(error);
    }
  }
);

/* Needed to get Vue.js Frontend to work properly */
router.get("*", async (req, res) => {
  let html = fs.readFileSync("./client/dist/index.html", "utf8");
  res.send(html);
})

export default router;
