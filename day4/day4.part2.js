function extractCardDetails(cardDocument) {

    const cards = []

    const cardLines = cardDocument.includes('\n') ? cardDocument.split('\n') : [cardDocument]

    for (let i = 0; i < cardLines.length; i++) {
        let cardNumber = cardLines[i].split(':')[0].trim().split(' ')[1]
        let winningNumbers = cardLines[i].split(':')[1].split('|')[0].split(' ').filter(x => x).map(number => parseInt(number))
        let myNumbers = cardLines[i].split(':')[1].split('|')[1].split(' ').filter(x => x).map(number => parseInt(number))

        cards.push({
            cardNumber: parseInt(cardNumber),
            winningNumbers: winningNumbers,
            myNumbers: myNumbers
        })
    }

    return cards
}

function calculateMatches ({ cardNumber, winningNumbers, myNumbers }) {

    // loop througn each of listOfMyNumbers and check if it is in listOfWinningNumbers
    // if it is, add 1 point
    let numberOfMatches = 0
    myNumbers.forEach(number => {
        if (winningNumbers.includes(number)) {
            numberOfMatches++
        }
    })

    return numberOfMatches
}

function getWinningCards(cards, cardNumber) {
    let winningCards = []

    const cardToCalculate = cards.find(card => card.cardNumber === cardNumber)
    if (!cardToCalculate)
        return winningCards

    const numberOfMatches = calculateMatches(cardToCalculate)

    for (let i = 0; i < numberOfMatches; i++) {
        let nextCard = cards.find(card => card.cardNumber === cardNumber+i+1)
        if (nextCard) {
            winningCards.push(nextCard)
        }
    }

    return winningCards
}

function getWonCardCount(cards, originalCards = []) {
    let scratchcards = []

    if (!originalCards || originalCards.length === 0)
        originalCards = cards

    for (const card of cards) {
        const winningCards = getWinningCards(originalCards, card.cardNumber)
        
        if (winningCards && winningCards.length > 0) {
            scratchcards = scratchcards.concat(winningCards)
        }

        scratchcards = scratchcards.concat(getWonCardCount(winningCards, originalCards))
    }

    return scratchcards
}

/* get won cards and sum with the number of cards in 'cards' */
function getAllScratchcards(cards) {
    const originalCards = extractCardDetails(cards)
    const wonCards = getWonCardCount(extractCardDetails(cards))

    return originalCards.length + wonCards.length
}

module.exports = {
    extractCardDetails,
    calculateMatches,
    getWinningCards,
    getWonCardCount,
    getAllScratchcards
}