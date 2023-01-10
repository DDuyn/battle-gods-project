
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

const getDetailNameHtmlElement = async (godCardHtmlElement) => {
  return godCardHtmlElement
    .$('div[class="gods__card"] > div[class="gods__details"] > div[class="gods__details--top"] > div[class="details__name"]')
}

const getDetailTitleHtmlElement = async (godCardHtmlElement) => {
  return godCardHtmlElement
    .$('div[class="gods__card"] > div[class="gods__details"] > div[class="gods__details--top"] > div[class="details__title"]')
}
