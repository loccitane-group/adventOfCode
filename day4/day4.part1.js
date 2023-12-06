 function calculatePoints (card) {
    //Example of card : Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53

    // Split card removing the first part "Card X:", then then an array of winning numbers separated by space, and then after a pipe the numbers we got separated by space
    const [_, numbers] = card.split(':')

    const [winningNumbers, myNumbers] = numbers.split('|')

    const listOfWinningNumbers = winningNumbers.split(' ').filter(x => x).map(number => parseInt(number))
    const listOfMyNumbers = myNumbers.split(' ').filter(x => x).map(number => parseInt(number))

    // loop througn each of listOfMyNumbers and check if it is in listOfWinningNumbers
    // if it is, add 1 point
    let numberOfMatches = 0
    listOfMyNumbers.forEach(number => {
        if (listOfWinningNumbers.includes(number)) {
            numberOfMatches++
        }
    })

    // if there is no matches, return 0
    if (numberOfMatches === 0) {
        return 0
    }

    return Math.pow(2, numberOfMatches-1)
}

/* Given the following 'cards':
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11

Should return an array with:
[
        'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53',
        'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19',
        'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1',
        'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83',
        'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36',
        'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11',
    ]
*/
function parseCards(cards) {
    // Split cards by new line
    const cardsArray = cards.split('\n')

    // Remove empty lines
    const cardsArrayWithoutEmptyLines = cardsArray.filter(x => x)

    // Remove spaces at the beginning and end of each line
    const cardsArrayWithoutEmptyLinesTrimmed = cardsArrayWithoutEmptyLines.map(card => card.trim())

    return cardsArrayWithoutEmptyLinesTrimmed
}

function calculateManyCards(cards) {
    // Parse cards
    const parsedCards = parseCards(cards)

    // Calculate points for each card
    const pointsForEachCard = parsedCards.map(card => calculatePoints(card))

    // Sum all points
    const totalPoints = pointsForEachCard.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    return totalPoints
}

module.exports = {
    calculatePoints,
    parseCards,
    calculateManyCards
}