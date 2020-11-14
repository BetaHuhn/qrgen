import { Request, Response, NextFunction } from 'express'
import rateLimit from 'express-rate-limit'
import status from '../utils/status'
import log from '../utils/log'

const ignoreRequestStrings: Array<string> = [ 'js/', 'css/', 'img/', 'static/', 'manifest.json', 'favicon.ico' ] // Don't log request if one of the strings are in URL

export function routeLog() {
	return (req:Request, res:Response, next: NextFunction) => {
		if (ignoreRequestStrings.some((value) => req.originalUrl.includes(value)) || req.method === 'HEAD') {
			return next()
		}
		const dateOb = new Date()
		const date = ('0' + dateOb.getDate()).slice(-2)
		const month = ('0' + (dateOb.getMonth() + 1)).slice(-2)
		const year = dateOb.getFullYear()
		const hours = dateOb.getHours()
		const minutes = dateOb.getMinutes()
		const seconds = dateOb.getSeconds()
		const time = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
		log.request(`${ time } ${ req.method } ${ req.originalUrl }`)
		next()
	}
}

export const limit = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 200,
	handler: function(req: Request, res: Response) {
		log.warn(`${ req.ip } has exceeded rate limit`)
		res.status(status.TOO_MANY_REQUESTS).send({
			status: status.TOO_MANY_REQUESTS,
			type: 'error',
			response: 'rate limit exceeded',
			error: {
				text: 'rate limit exceeded',
				limit: req.rateLimit.limit,
				current: req.rateLimit.current,
				remaining: req.rateLimit.remaining,
				resetTime: req.rateLimit.resetTime
			}
		})
	},
	headers: true
})