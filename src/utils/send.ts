import { Response } from 'express'

export default function(res: Response, result: any, status: number) {
	res.json({
		status: status,
		result
	})
}