const axios = require('axios')
const cheerio = require('cheerio')
const pHF = require('./parseHelperFunctions')

const { 
    ensureEndingBackslash,
    addBaseUrl,
    parseResultsCleaner
 } = pHF


// Rule of thumb, everything must end with / and must be removed if needed.
module.exports = async function httpGetParseMethod(url) {
    
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)

    let hrefList = []

    $('a').each( (i, element) => hrefList[i] = $(element).attr().href )

    if(!hrefList[0]) {
        console.log("http get parse failed")
        return
      }
    
    const baseUrl = ensureEndingBackslash(response.config.url)

    const backSlashedHrefList = ensureEndingBackslash(hrefList)
    const formattedHrefList = addBaseUrl(backSlashedHrefList, baseUrl)
    const cleanedHrefList = parseResultsCleaner(formattedHrefList, baseUrl)

     console.log(cleanedHrefList)

    //return cleanedHrefList
}

