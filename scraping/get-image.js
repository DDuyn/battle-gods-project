import { createWriteStream, unlink } from 'fs'
import https from 'https'
import path from 'node:path'
import { chromium } from 'playwright'
import sharp from 'sharp'

const INPUT_PATH = path.join(process.cwd(), 'assets', 'static', 'gods')
const OUTPUT_PATH = path.join(process.cwd(), 'assets', 'static', 'gods')

export const getImageSkin = async (url, godName) => {
	const browser = await chromium.launch()
	const page = await browser.newPage()

	await page.goto(url)

	const godProfileHtmlElement = await page.mainFrame().waitForSelector('div.skins__list')
	const elementHandle = await godProfileHtmlElement.$('div[class="single__skin"]')
	const image = await elementHandle.evaluate(async (element) => {
		return await window
			.getComputedStyle(element)
			.getPropertyValue('background-image')
			.slice(4, -1)
			.replace(/"/g, '')
	})

	const filename = `${godName.replaceAll(' ', '-')}.png`
	await downloadImage(image, filename)

	await browser.close()
	return filename.replace('.png', '.webp')
}

const downloadImage = async (url, filename) => {
	await https.get(url, async (response) => {
		const filePath = path.join(INPUT_PATH, filename)
		const file = await createWriteStream(filePath)
		response.pipe(file)
		await file.on('finish', async () => {
			await optimizeImage(filename)
			await unlink(filePath, () => {})
			file.close()
		})
	})
}

const optimizeImage = async (file) => {
	const filePath = path.join(INPUT_PATH, file)
	const outputPath = path.join(OUTPUT_PATH, file.replace('.png', '.webp'))

	await sharp(filePath).webp({ effort: 6 }).toFile(outputPath)
}
