import express from "express";
import Short from "../models/model.js";
import mongoose from "mongoose";
import fs from "fs";
import rateLimit from "express-rate-limit";
import generate from "nanoid";
const validURL = require("../utils/validUrl");
const currentDate = require("../utils/currentDate");
const router = express.Router();

const limit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  handler: function (req: express.Request, res: express.Response /*next*/) {
    console.log(req.ip + " has exceeded rate limit");
    res.status(429).send({
      status: 429,
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
  // TODO: seems to not exist?
  // draft_polli_ratelimit_headers: true,
  headers: true,
});

router.get("*", async (req, res) => {
  let url = req.url.substr(1);
  try {
    let short = await Short.findOne({ code: url });
    if (!short) {
      url = await validURL(url);
      if (url) {
        let short = await Short.findOne({ url: url });
        if (!short) {
          console.log("adding short to db");
          const _id = new mongoose.Types.ObjectId();
          const query = {
            _id,
            // TODO: enter length of generated code
            code: generate(5),
            url,
            addedAt: currentDate(),
          };
          try {
            let short = new Short(query);
            // TODO: remove any
            short.save(async function (err: any, doc: any) {
              if (err) {
                console.error(err);
                res.json({ status: "400", type: "error" });
              } else {
                console.log("Short added as: " + doc._id);
                res.redirect("/?code=" + doc.code + "&url=" + doc.url);
              }
            });
          } catch (error) {
            console.error(error);
            res.json({ status: "400", type: "error" });
          }
        } else {
          console.log(
            "short: " +
              short.code +
              " url: " +
              short.url +
              " already in db -> frontend"
          );
          res.redirect("/?code=" + short.code + "&url=" + short.url);
        }
      } else {
        console.log("not a valid code/url -> frontend");
        let html = fs.readFileSync("./client/dist/index.html", "utf8");
        res.send(html);
      }
    } else {
      console.log(
        "short: " + short.code + " found -> redirecting to " + short.url
      );
      short.increase();
      res.redirect(short.url);
    }
  } catch (error) {
    console.error(error);
    res.json({ status: 500, response: "error" });
  }
});

router.post("/api/create", limit, async (req, res) => {
  let url = await validURL(req.body.url);
  if (url) {
    try {
      let short = await Short.findOne({ url: url });
      if (!short) {
        const _id = new mongoose.Types.ObjectId();
        const query = {
          _id,
          // TODO: enter length of generated code
          code: generate(5),
          url,
          addedAt: currentDate(),
        };
        try {
          let short = new Short(query);
          // TODO: remove any
          short.save(async function (err: any, doc: any) {
            if (err) {
              console.error(err);
              res.json({ status: "400", type: "error" });
            } else {
              console.log(
                "Short added, code: " + doc.code + " url: " + doc.url
              );
              res.json({
                status: "200",
                response: "success",
                data: {
                  code: doc.code,
                  url: doc.url,
                },
              });
            }
          });
        } catch (error) {
          console.error(error);
          res.json({ status: "400", type: "error" });
        }
      } else {
        console.log(
          "Short already in db, code: " + short.code + " url: " + short.url
        );
        res.json({
          status: 200,
          response: "success",
          data: {
            code: short.code,
            url: short.url,
          },
        });
      }
    } catch (error) {
      console.error(error);
      res.json({ status: 500, response: "error" });
    }
  } else {
    console.log(req.body.url + " is not a valid url");
    res.json({
      status: 405,
      response: "not a valid url",
    });
  }
});

export default router;
