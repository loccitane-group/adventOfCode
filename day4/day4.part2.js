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

    return numberOfMatches
}

module.exports = {
    calculatePoints,
}