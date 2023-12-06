function fixKerning(raceDocument) {
    return raceDocument.replace(/(\d)\s+(\d)/g, '$1$2')
}

module.exports = {
    fixKerning
}