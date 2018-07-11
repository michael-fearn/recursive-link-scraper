module.exports = {
    
    ensureEndingBackslash:  input => {
        if (typeof input === "string") {
            if( !input.endsWith('/')) {
                return input + '/'
            }
            else {
                return input
            }
        }
        else {
            return input.map( href => {
                // Ensuring link string ends with /
                if(!href.endsWith('/')) { 
                    return href + '/'
                } 
                else {
                    return href
                }
        })
    
        }
    },


    addBaseUrl: (hrefList, baseUrl) => {
        return hrefList.map( href => {
            if(href.startsWith('/') || href.startsWith('?')) {
                // Removing extra backslash between base url and the rest of the link string 
                return baseUrl.slice(0, baseUrl.length - 1) + href 
            }
            else {
                return href
            }
        })
    },


    parseResultsCleaner: (hrefList, baseUrl) => {
        return hrefList
            .filter( href => {
                return href 
                    && !href.startsWith('#')  
                    && !href.startsWith(baseUrl + '#') 
                    && !href.startsWith('javascript')
            })
    }
}