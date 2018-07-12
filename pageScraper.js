const puppeteerParseMethod = require('./puppeteerParseMethod')
const httpGetParseMethod = require('./httpGetParseMethod')

module.exports = async function pageScraper(pageUrl, usePuppeteer = false) {

    let hrefList
    let httpGetParseFailed = false

    if(usePuppeteer) {
         hrefList =  await puppeteerParseMethod(pageUrl)
         
         if(!hrefList[0]) {
            return [[], usePuppeteer]
        }
    }
    else {
        hrefList = await httpGetParseMethod(pageUrl)
        console.log(hrefList)
        if(!hrefList) {
            hrefList =  await puppeteerParseMethod(pageUrl)
            // httpGetParseFailed = true
           }
    }


    return hrefList
}