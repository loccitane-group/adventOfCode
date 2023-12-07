function extractHandsAndBids(input) {
    return input.split('\n').map(line => {
        const [hand, bid] = line.trim().split(' ')
        return {
            hand,
            bid
        }
    })
}

function countOccurence(card, hand) {
    return hand.split('').filter(c => c === card).length
}

function countAllOccurence(hand) { 
    const occurencesMap = new Map()

    for (let i=0; i<hand.length; i++) {
        const card = hand[i]
        const occurence = countOccurence(card, hand)

        occurencesMap.set(card, occurence)
    }

    return occurencesMap
}

function calculateStrength(hand) {
    const occurencesMap = new Map()

    for (let i=0; i<hand.length; i++) {
        const card = hand[i]
        const occurence = countOccurence(card, hand)

        if (occurencesMap.has(card)) {
            const previousOccurence = occurencesMap.get(card)
            occurencesMap.set(card, previousOccurence + occurence)
        }
        else {
            occurencesMap.set(card, occurence)
        }
    }
}

const HAND_STRENGTHS = {
    'Five of a Kind': 7,
    'Four of a Kind': 6,
    'Full House': 5,
    'Three of a Kind': 4,
    'Two Pairs': 3,
    'One Pair': 2,
    'High Card': 1
}

const CARD_STRENGTHS = {
    'A': 14,
    'K': 13,
    'Q': 12,
    'J': 11,
    'T': 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2
}

module.exports = {
    extractHandsAndBids,
    HAND_STRENGTHS,
    countOccurence,
    countAllOccurence,
    calculateStrength
}