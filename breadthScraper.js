const pageScraper = require('./pageScraper')

// module.exports = async function breadthRecursiveScraper(url) {
//     return await pageScraper(url)
// } 



module.exports = async function breadthSearch (depth,  url = '', parentNode = []) {
    let num = 0
    if ( num >= depth){
        return
    }

    
    if (!parentNode[0]) {
        parentNode = await pageScraper(url)
        // socket.emit(array)
        console.log(parentNode)
    }
    num++
    let currentNode = []
    for(let i = 0; i < parentNode.length; i++) {
        const pageScraperResults = await pageScraper(parentNode[i])
        currentNode = [...currentNode, ...pageScraperResults];
        console.log('depth: ', num, "position in currentNode", i+1, "currentNode: ", parentNode.length, "childNode:", currentNode.length)
        // console.log(pageScraperResults)
        // console.log(i)
        // socket.emit arry2, or each scrape, concatinated at the client
    }
        // socket.emit another code to symbolize the end of the node ring
   

    breadthSearch( num, '', currentNode)
}