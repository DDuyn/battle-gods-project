
export const getPantheon = async (godHtmlElement) => {
  const godPantheonDetail = await godHtmlElement
    .$('div[class="gods__card"] > div[class="gods__details"] > div[class="details__pantheon"] > i')
    .then(async (x) => {
      const iconClass = await x.getAttribute('class')
      return iconClass.substring(5)
    })
  return godPantheonDetail.charAt(0).toUpperCase() + godPantheonDetail.slice(1)
}
