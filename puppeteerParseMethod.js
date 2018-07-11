const puppeteer = require('puppeteer') 
const pHF = require('./parseHelperFunctions')

const {
    ensureEndingBackslash,
    parseResultsCleaner
} = pHF

module.exports = async function puppeteerParseMethod(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)
    
    const hrefList = await page.evaluate( ()  => [...document.links].map(e => e.href))
    
    await browser.close()

    const baseUrl = ensureEndingBackslash(url)

    const formattedHrefList = ensureEndingBackslash(hrefList)
    const cleanedHrefList = parseResultsCleaner(formattedHrefList, baseUrl)

    return cleanedHrefList
}
// ~.520s overhead to launch and end puppeteer