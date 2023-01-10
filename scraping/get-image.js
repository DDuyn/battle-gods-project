export const getImage = async (godHtmlElement) => {
  const godCardHtmlElement = await godHtmlElement.$(
    'div[class="gods__card"]'
  )
  const image = await godCardHtmlElement.evaluate((element) => {
    return window.getComputedStyle(element).getPropertyValue('background-image').slice(4, -1).replace(/"/g, '')
  })

  return image
}
