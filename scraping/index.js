import { chromium } from 'playwright'
import { getGods } from '../db/index.js'
import { logInfo } from '../utils/logger.js'
import { GODS_URL } from './constants.js'
import { getGodInfo } from './get-god-info.js'

const browser = await chromium.launch()
const page = await browser.newPage()

await page.goto(`${GODS_URL}/gods`)
const godsHtmlElements = await (await page.mainFrame().waitForSelector('div.gods')).$$('a')

let godsDb = await getGods()
if (godsDb.length < godsHtmlElements.length) {
	godsDb = await getGodInfo(godsHtmlElements)
} else logInfo('There are no new gods')

await browser.close()
