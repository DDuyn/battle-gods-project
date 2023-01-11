import { writeDBFile } from '../db/index.js'
import { logError, logInfo, logSuccess } from '../utils/logger.js'
import { GODS_URL, NEW_GOD_CLASS } from './constants.js'
import { getGodName, getGodTitle, getPantheon } from './get-god.js'
import { getImageSkin } from './get-image.js'

const isNewGodElement = async (godHtmlElement) => {
	const nameClassLinkElement = await godHtmlElement.getAttribute('class')
	return NEW_GOD_CLASS === nameClassLinkElement
}

export const getGodInfo = async (godsHtmlElements) => {
	const godsToSave = []
	const start = performance.now()
	logInfo('Init scrape gods')
	try {
		for (const godHtmlElement of await godsHtmlElements) {
			const isNewGod = await isNewGodElement(godHtmlElement)
			const name = await getGodName(godHtmlElement, isNewGod)

			logInfo(`Scrapping ${name}`)

			const pantheon = await getPantheon(godHtmlElement)
			const title = await getGodTitle(godHtmlElement, isNewGod)

			const url = GODS_URL + (await godHtmlElement.getAttribute('href'))
			const image = await (await getImageSkin(url, name)).replace(/('|\s)/g, '-').toLowerCase()
			const id = name.replaceAll(/('|\s)/g, '-').toLowerCase()

			godsToSave.push({
				id,
				name,
				title,
				pantheon,
				image
			})

			logInfo(`Scrapping ${name} successfully`)
		}

		logInfo('Writing to database...')
		writeDBFile('gods', godsToSave)
		logSuccess('written successfully')
		return godsToSave
	} catch (e) {
		logError('Error scraping ')
		logError(e)
	} finally {
		const end = performance.now()
		const time = (end - start) / 1000
		logInfo(`[scraped ${godsToSave.length} gods in ${time.toFixed(2)} seconds]`)
	}
}
