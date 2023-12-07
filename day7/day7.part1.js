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

    if (allCardOccurences.size === 3) {
        if ([...allCardOccurences.entries()].filter(([card, occurence]) => occurence === 2).length === 2)  {
            return HAND_STRENGTHS['Two Pairs']
        }

        return HAND_STRENGTHS['Three of a Kind']
    }
    
    if (allCardOccurences.size === 2) {
        if ([...allCardOccurences.entries()].filter(([card, occurence]) => occurence === 3).length === 1)  {
            return HAND_STRENGTHS['Full House']
        }

        return HAND_STRENGTHS['Four of a Kind']
    }

    if (allCardOccurences.size === 5) {
        return HAND_STRENGTHS['High Card']
    }

    if (allCardOccurences.size === 4) {
        return HAND_STRENGTHS['One Pair']
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

function compareHands(handA, handB) {
    for (let i=0; i<handA.hand.length; i++) {
        const cardA = handA.hand[i]
        const cardB = handB.hand[i]

        if (CARD_STRENGTHS[cardA] === CARD_STRENGTHS[cardB]) {
            continue
        }

        if(CARD_STRENGTHS[cardA] > CARD_STRENGTHS[cardB]) {
            return 1
        }

        if(CARD_STRENGTHS[cardA] < CARD_STRENGTHS[cardB]) {
            return -1
        }
    }

    return 0
}

function orderByRank(hands) {
    const handsWithStrength = hands.map(hand => hand.hand)
        .map(hand => {
            return {
                hand,
                strength: calculateStrength(hand)
            }
        })
    const sortedHands = handsWithStrength.sort((a, b) => {
            if (a.strength === b.strength) {
                return compareHands(a, b)
            }

            return a.strength - b.strength
        })
        
    return sortedHands.map(hand => ({
            hand: hand.hand
        }))
}

function calculateTotalWinnings(setOfHands) {
    const rankedHands = orderByRank(setOfHands)

    const totalWinnings = rankedHands.reduce((total, hand, index) => {
        const bid = setOfHands.find(h => h.hand === hand.hand).bid
        const winnings = bid * (index + 1)

        return total + winnings
    }, 0)

    return totalWinnings
}

module.exports = {
    extractHandsAndBids,
    HAND_STRENGTHS,
    countOccurence,
    countAllOccurence,
    calculateStrength,
    orderByRank,
    compareHands,
    calculateTotalWinnings
}