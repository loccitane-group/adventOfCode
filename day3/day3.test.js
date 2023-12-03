const { sum } = require('./day3')

test('sum adjacent numbers', () => {
    const adjacentsNumbers = [
        467,
        35,
        633,
        617,
        592,
        755,
        664,
        598
    ]

    const result = sum(adjacentsNumbers)
    
    expect(result).toBe(4361)
})
