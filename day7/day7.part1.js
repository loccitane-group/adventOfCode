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

    const allCardOccurences = countAllOccurence(hand)

    if (allCardOccurences.size === 1) {
        return HAND_STRENGTHS['Five of a Kind']
    }

    if (allCardOccurences.size === 5) {
        return HAND_STRENGTHS['High Card']
    }

    if (allCardOccurences.size === 4) {
        return HAND_STRENGTHS['One Pair']
    }

    if (allCardOccurences.size === 2) {
        if ([...allCardOccurences.entries()].filter(([card, occurence]) => occurence === 3).length === 1)  {
            return HAND_STRENGTHS['Full House']
        }

        return HAND_STRENGTHS['Four of a Kind']
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