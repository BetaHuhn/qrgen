import express from "express";
import ejs from "ejs";
import fs from "fs";
import yxc, { connect } from "@dotvirus/yxc";
import createShort from '../service/createShort'
import Short from "../models/short";
import { Regex } from "../utils/regex";
import { limit } from "../middleware";
import sendResult from "../utils/send";
import status from "../utils/status";
import log from "../utils/log";
const router = express.Router();

router.get(
	"/api/",
	limit,
	connect({
		query: yxc.object({
			code: yxc.string().notEmpty(),
		})
	}),
	async (req, res, next) => {
		const code = <string>req.query.code;
		try {
			log.info(`Checking if short "${ code }" exists...`);
			const short = await Short.findOne({ code: code });
			if (short) {
				log.info(`short with code ${ short.code } found. Updating counter...`);
				await short.updateOne({
					$inc: {
						count: 1,
					},
				});

				log.info(`Return data`);
				return sendResult(res, {
					code: short.code,
					url: short.url,
					title: short.title,
					description: short.description,
					provider: short.provider,
					image: short.image
				}, 200);
			}

			log.warn("No short found");
			sendResult(res, 'not found', status.NOT_FOUND);
		} catch (err) {
			log.fatal(err);
			next(err);
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

			log.info(`Checking if "${ url }" exists...`);
			const entry = await Short.findOne({ url: url });

			if (entry) {
				log.warn("Entry already exists");
				return sendResult(res, {
				code: entry.code,
				url: entry.url,
				}, 200);
			}
			
			log.info("No entry found. Creating new one...");
			const human = req.body.human != undefined && req.body.human === true;
			const createdShort = await createShort(url, human);

			sendResult(res, {
				code: createdShort.code,
				url: createdShort.url,
			}, 200);
		} catch (err) {
			log.fatal(err);
			next(err);
		}
	}
);

router.get("*", async (req, res) => {
	const code = req.originalUrl.replace(/^\/+/, '')
	if (!code) {
		const html = fs.readFileSync("./client/dist/main.html", "utf8");
		return res.send(html);
	}

	try {
		log.info(`Checking if short "${ code }" exists...`);
		const short = await Short.findOne({ code: code });
		if (short) {
			log.info(`short with code ${ short.code } found. Updating counter...`);
			await short.updateOne({
				$inc: {
				count: 1,
				},
			});

			const data = {
				url: short.url,
				code: short.code,
				title: short.title,
				provider: short.provider || short.url,
				image: short.image || 'https://qrgen.cc/static/banner.png',
				description: short.description ? `${ short.description } | URL shortened by QrGen.cc` : 'This URL was shortened by QrGen.cc, a free service that lets you create QR-Codes and shortened URLs from any link quickly and easily.'
			}

			log.info(`Redirecting to ${ short.url }...`);
			const html = await ejs.renderFile("./src/views/redirect.ejs", data)
			return res.send(html)
		}

		log.warn("No short found");
	} catch (err) {
		log.fatal(err)
	}

	const html = fs.readFileSync("./client/dist/main.html", "utf8");
	res.send(html);
})

export default router;
