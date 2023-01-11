import path from 'node:path'
import { chromium } from 'playwright'
import sharp from 'sharp'
import { logInfo } from '../utils/logger.js'

const STATICS_PATH = path.join(process.cwd(), './public/gods')

export const getImageSkin = async (url, id) => {
	const browser = await chromium.launch()
	const page = await browser.newPage()

	await page.goto(url)

	const godProfileHtmlElement = await page.mainFrame().waitForSelector('div.skins__list')
	const elementHandle = await godProfileHtmlElement.$('div[class="single__skin"]')
	const urlImage = await elementHandle.evaluate(async (element) => {
		return await window
			.getComputedStyle(element)
			.getPropertyValue('background-image')
			.slice(4, -1)
			.replace(/"/g, '')
	})
	await browser.close()

	return saveImage(urlImage, id)
}

const saveImage = async (url, fileName) => {
	logInfo(`Fetching image for file name: ${fileName}`)
	const responseImage = await fetch(url)
	const arrayBuffer = await responseImage.arrayBuffer()
	const buffer = Buffer.from(arrayBuffer)

	logInfo(`Writing image to disk ${fileName}`)

	const imageFileName = `${fileName}.webp`
	const imageFilePath = path.join(STATICS_PATH, imageFileName)
	await sharp(buffer).webp().toFile(imageFilePath)

	logInfo(`Everything is done! ${fileName}`)

	return imageFileName
}
