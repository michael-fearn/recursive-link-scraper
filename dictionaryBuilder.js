module.exports = function dictionaryBuilder ( hrefList, fromPage ) {

  return hrefList.reduce((obj, url) => { 
      obj[url] ? obj[url]++ : obj[url] = 1;
      return obj;
  },{})

}