const puppeteer = require('puppeteer') 
const pHF = require('./parseHelperFunctions')

const {
    ensureEndingBackslash,
    parseResultsCleaner
} = pHF

module.exports = async function puppeteerParseMethod(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    
    try {
        await page.goto(url)
    } catch(error) {
        console.log("page not found")
        return []
    }
    const hrefList = await page.evaluate( ()  => [...document.links].map(e => e.href))
    console.log(hrefList)
    await browser.close()

    const baseUrl = ensureEndingBackslash(url)

    const cleanedHrefList = parseResultsCleaner(hrefList, baseUrl)
    const formattedHrefList = ensureEndingBackslash(cleanedHrefList)
   
    return formattedHrefList
}
// ~.520s overhead to launch and end puppeteer