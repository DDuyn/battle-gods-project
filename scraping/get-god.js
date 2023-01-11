
export const getGodName = async (godCardHtmlElement, isNewGod) => {
  const godNameElement = isNewGod
    ? await getDetailTitleHtmlElement(godCardHtmlElement)
    : await getDetailNameHtmlElement(godCardHtmlElement)
  const godName = await godNameElement.textContent()

  return isNewGod
    ? godName.substring(0, godName.indexOf('-')).trim()
    : godName
}

export const getGodTitle = async (godCardHtmlElement, isNewGod) => {
  const godTitleElement = await getDetailTitleHtmlElement(godCardHtmlElement)
  const godTitle = await godTitleElement.textContent()
  return isNewGod
    ? godTitle.substring(godTitle.indexOf('-') + 1).trim()
    : godTitle
}

export const getPantheon = async (godCardHtmlElement) => {
  const godPantheonDetail = await getDetailPantheonHtmlElement(godCardHtmlElement)
    .then(async (x) => {
      const iconClass = await x.getAttribute('class')
      return iconClass.substring(5)
    })
  return godPantheonDetail.charAt(0).toUpperCase() + godPantheonDetail.slice(1)
}

const getDetailPantheonHtmlElement = async (godCardHtmlElement) => {
  return godCardHtmlElement
    .$('div[class="gods__card"] > div[class="gods__details"] > div[class="details__pantheon"] > i')
}

const getDetailNameHtmlElement = async (godCardHtmlElement) => {
  return godCardHtmlElement
    .$('div[class="gods__card"] > div[class="gods__details"] > div[class="gods__details--top"] > div[class="details__name"]')
}

const getDetailTitleHtmlElement = async (godCardHtmlElement) => {
  return godCardHtmlElement
    .$('div[class="gods__card"] > div[class="gods__details"] > div[class="gods__details--top"] > div[class="details__title"]')
}
