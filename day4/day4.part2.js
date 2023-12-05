const { parseCards } = require('./day4.part1')

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

    return numberOfMatches
}

/*
    Given the following 'cards':
    Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
    Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
    Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
    Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
    Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
    Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11

    And a starting index of 0

    Should return an array with:
    'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19',
    'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1',
    'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83',
    'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36'
*/
function getWinningCards(cards, startingIndex) {
    const cardsArray = parseCards(cards)

    const cardToCalculate = cardsArray[startingIndex]
    const numberOfMatches = calculatePoints(cardToCalculate)
    const winningCards = cardsArray.slice(startingIndex+1, startingIndex+numberOfMatches+1)

    return winningCards
}

module.exports = {
    calculatePoints,
    getWinningCards
}