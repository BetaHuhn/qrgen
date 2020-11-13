import { Request, Response, NextFunction } from 'express'
import log from '../utils/log'

const ignoreRequestStrings: Array<string> = [ 'js/', 'css/', 'img/', 'static/', 'manifest.json' ] // Don't log request if one of the strings are in URL

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

/**
 * Sends a response back to the client
 * @param res response - handled by express automatically
 * @param result Result (content) that should be send to the client
 * @param status Status (in json) that should be send to the client
 */
export function sendResult(res: Response, result: any, status: number) {
  res.json({
    time: +new Date(),
    status: status,
    result,
  });
}
