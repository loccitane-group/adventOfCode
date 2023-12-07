function extractHandsAndBids(input) {
    return input.split('\n').map(line => {
        const [hand, bid] = line.trim().split(' ')
        return {
            hand,
            bid
        }
    })
}

module.exports = {
    extractHandsAndBids
}