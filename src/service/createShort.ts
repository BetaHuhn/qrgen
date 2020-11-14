import mongoose from 'mongoose'
import generate from 'nanoid'
import getMetaData from 'metadata-scraper'
import Short from '../models/short'
import log from '../utils/log'
import { randomWord, randomColor } from '../utils/random'

const createShort = async function(url: string, human = false) {
	let code
	if (human === true) {
		log.info('Using human readable format as code')
		code = randomColor() + '-' + randomWord()
	} else {
		code = generate(5)
	}

	log.info('Getting metadata for URL...')
	const metadata = await getMetaData(url)
	const query = {
		_id: new mongoose.Types.ObjectId(),
		code,
		count: 0,
		url,
		title: metadata.title,
		description: metadata.description,
		provider: metadata.provider,
		image: metadata.image,
		addedAt: Number(new Date())
	}

	log.info('Defining new mongoose-short...')
	const short = new Short(query)

	log.info('Saving short in database...')
	const createdShort = await short.save()
	return createdShort
}

export default createShort