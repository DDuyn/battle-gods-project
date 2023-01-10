import { writeDBFile } from '../db/index.js'
import { logError, logInfo, logSuccess } from '../utils/logger.js'
import { NEW_GOD_CLASS } from './constants.js'
import { getGodName, getGodTitle } from './get-god.js'
import { getImage } from './get-image.js'
import { getPantheon } from './get-pantheon.js'

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
      const pantheon = await getPantheon(godHtmlElement)
      const name = await getGodName(godHtmlElement, isNewGod)
      const title = await getGodTitle(godHtmlElement, isNewGod)
      const image = await getImage(godHtmlElement)

      godsToSave.push({
        name,
        title,
        pantheon,
        image,
        new: isNewGod
      })
    }
    logInfo('Writing to database...')
    writeDBFile('gods', godsToSave)
    logSuccess('written successfully')
  } catch (e) {
    logError('Error scraping ')
    logError(e)
  } finally {
    const end = performance.now()
    const time = (end - start) / 1000
    logInfo(
      `[scraped ${godsToSave.length} gods in ${time.toFixed(2)} seconds]`
    )
  }
}
