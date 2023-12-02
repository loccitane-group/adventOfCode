const {
    sumOfGameIds,
    findPossibleGames
} = require('./day2')

// test('adds 1 + 2 to equal 3', () => {
//     const gameRecords = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
//     Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
//     Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
//     Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
//     Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

    

//     expect(sum(1, 2)).toBe(3)
// })


test('Sum of Game Ids 1 and 2 should be 3', () => {
    const gameIds = ['Game 1', 'Game 2',]

    expect(sumOfGameIds(gameIds)).toBe(3)
})

test('Sum of Game Ids 3 and 4 should be 7', () => {
    const gameIds = ['Game 3', 'Game 4']

    expect(sumOfGameIds(gameIds)).toBe(7)
})


test('Sum of Game Ids 1 and 2 and 5 should be 8', () => {
    const gameIds = ['Game 1', 'Game 2', 'Game 5']

    expect(sumOfGameIds(gameIds)).toBe(8)
})