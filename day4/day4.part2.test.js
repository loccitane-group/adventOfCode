const { calculatePoints } = require('./day4.part2')

test('first case should count the number of matches', () => {
    const card = 'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53'

    const points = calculatePoints(card)

    expect(points).toBe(4)
})

