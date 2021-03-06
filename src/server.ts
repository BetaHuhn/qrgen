import express from 'express'
import bodyParser from 'body-parser'
const app = express()
import cors from 'cors'
import compression from 'compression'
import dotenv from 'dotenv'
dotenv.config()

import appRouter from './router/app'
import { routeLog } from './middleware'
import log from './utils/log'
import { connectDatabase } from './database'

export const init = () => {
	connectDatabase()

	app.use(routeLog())
	app.use(express.static('build/dist'))
	app.use(express.json({ limit: '1mb' }))
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }))
	app.set('view engine', 'ejs')
	app.set('views', 'build/views')
	app.use(compression())

	app.use((req, res, next) => {
		res.setHeader('Content-Security-Policy', `script-src 'self' stats.mxis.ch 'unsafe-inline'; connect-src 'self' stats.mxis.ch; script-src-attr 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; default-src 'self'; block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;`)
		res.setHeader('X-Powered-By', 'magic')
		next()
	})

	const corsOptions = {
		origin: [ 'https://qrgen.cc', 'https://dev.qrgen.cc' ],
		methods: [ 'GET', 'OPTIONS', 'POST' ]
	}
	app.use(cors(corsOptions))

	app.use(appRouter)

	// Error handler
	app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
		if (!err) {
			return next()
		}

		let returnStatus
		if (err.name === 'HTTPError') {
			log.warn('Metdata parsing failed: ' + err.message)
			returnStatus = err.response.statusCode
		} else {
			log.fatal(err)
			returnStatus = typeof err === 'number' ? err : 400
		}

		const message = err.message || 'An unkown error ocurred, please try again.'

		res.status(returnStatus).json({
			status: returnStatus,
			message: message
		})
	})

	return app
}