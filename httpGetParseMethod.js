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
    
    let response;

    try {
        response = await axios.get(url)
    } catch(err) {
        console.log("page not found")
        return []
    }

    const $ = cheerio.load(response.data)

    let hrefList = []

    $('a').each( (i, element) => hrefList[i] = $(element).attr().href )

    if(!hrefList[0]) {
        console.log("http get parse failed")
        return
      }
    
    const baseUrl = ensureEndingBackslash(response.config.url)

    const cleanedHrefList = parseResultsCleaner(hrefList, baseUrl)
    const backSlashedHrefList = ensureEndingBackslash(cleanedHrefList)
    const formattedHrefList = addBaseUrl(backSlashedHrefList, baseUrl)

    return formattedHrefList
}

