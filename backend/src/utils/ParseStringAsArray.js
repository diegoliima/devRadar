module.exports = function ParseStringAsArray(arrayAsString){
    return arrayAsString.split(",").map(s => s.trim())
}