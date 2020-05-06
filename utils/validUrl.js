const urlExists = require('url-exists-deep').default

module.exports = async function (url){
    url = (!/^https?:\/\//i.test(url)) ? ("https://" + url) : url;
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    var regexp = new RegExp(expression);
    if(regexp.test(url)){
        var result = await urlExists(url);
        return result
    }else{
        return false
    }
}