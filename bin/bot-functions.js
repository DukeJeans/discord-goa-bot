exports.getRandomInt = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

exports.hash = function(strToHash) {
    var hash = 0;
    if (strToHash.length == 0) {
        return hash;
    }
    for (var i = 0; i < strToHash.length; i++) {
        var char = strToHash.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}