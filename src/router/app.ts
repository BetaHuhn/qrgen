import express from 'express'
import fs from 'fs'
import yxc, { connect } from '@dotvirus/yxc'
import createShort from '../service/createShort'
import Short from '../models/short'
import { Regex } from '../utils/regex'
import { limit } from '../middleware'
import sendResult from '../utils/send'
import status from '../utils/status'
import log from '../utils/log'
const router = express.Router()

const CACHE_TIME = 60 * 60 * 10; // 10 hours

router.get(
	'/api/',
	limit,
	connect({
		query: yxc.object({
			code: yxc.string().notEmpty()
		})
	}),
	async (req, res, next) => {
		const code = <string>req.query.code

		try {
			log.info(`Checking if short "${ code }" exists...`)
			const short = await Short.findOne({ code: code })
			if (short) {
				log.info(`short with code ${ short.code } found. Updating counter...`)
				await short.updateOne({
					$inc: {
						count: 1
					}
				})

				log.info(`Return data`)
				return sendResult(res, {
					code: short.code,
					url: short.url,
					title: short.title,
					description: short.description,
					provider: short.provider,
					image: short.image
				}, 200)
			}

			log.warn('No short found')
			sendResult(res, 'not found', status.NOT_FOUND)
		} catch (err) {
			return next(err)
		}
	}
)

router.post(
	'/api/create',
	limit,
	connect({
		body: yxc.object({
			url: yxc.string().regex(Regex.url),
			human: yxc.boolean().optional()
		})
	}),
	async (req, res, next) => {
		try {
			const url: string = new URL(req.body.url).toString()

			log.info(`Checking if "${ url }" exists...`)
			const entry = await Short.findOne({ url: url })

			if (entry) {
				log.warn('Entry already exists')
				return sendResult(res, {
					code: entry.code,
					url: entry.url
				}, 200)
			}

			log.info('No entry found. Creating new one...')
			const human = req.body.human !== undefined && req.body.human === true
			const createdShort = await createShort(url, human)

			sendResult(res, {
				code: createdShort.code,
				url: createdShort.url
			}, 200)
		} catch (err) {
			return next(err)
		}
	}
)

router.get('*', async (req, res) => {
	const code = req.originalUrl.replace(/^\/+/, '')
	if (!code) {
		const html = fs.readFileSync('./build/dist/index.html', 'utf8')
		return res.send(html)
	}

	try {
		log.info(`Checking if short "${ code }" exists...`)
		const short = await Short.findOne({ code: code })
		if (short) {
			log.info(`short with code ${ short.code } found. Updating counter...`)
			await short.updateOne({
				$inc: {
					count: 1
				}
			})

			const data = {
				url: short.url,
				code: short.code,
				metaAvailable: short.title !== undefined,
				title: short.title ? `${ short.title }` : 'Short URL by QrGen.cc',
				provider: short.provider || short.url,
				image: short.image || 'https://qrgen.cc/static/banner.png',
				description: short.description ? `${ short.description } | URL shortened by QrGen.cc` : 'This URL was shortened by QrGen.cc, a free service that lets you create QR-Codes and shortened URLs from any link quickly and easily.'
			}

			log.info(`Redirecting to ${ short.url.slice(0, 60) }...`)
			res.setHeader('Cache-Control', `max-age=15, s-max-age=${ CACHE_TIME }, stale-while-revalidate, public`)
			return res.render('redirect.ejs', data)
		}

		log.warn('No short found')
	} catch (err) {
		log.fatal(err)
	}

	const html = fs.readFileSync('./build/dist/index.html', 'utf8')
	res.send(html)
})

export default router