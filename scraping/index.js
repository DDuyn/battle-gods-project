import { chromium } from 'playwright'
import { GODS } from '../db/index.js'
import { logInfo } from '../utils/logger.js'
import { GODS_URL } from './constants.js'
import { getGodInfo } from './get-god-info.js'

const browser = await chromium.launch()
const page = await browser.newPage()

await page.goto(GODS_URL)
const godsHtmlElements = await (await page.mainFrame().waitForSelector('div.gods')).$$('a')

if (GODS.length < godsHtmlElements.length) {
  await getGodInfo(godsHtmlElements)
} else logInfo('There are no new gods')

browser.close()
