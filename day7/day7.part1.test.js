const { extractHandsAndBids } = require('./day7.part1')

test('extract hands and bids', () => {
    const input = `32T3K 765
    T55J5 684
    KK677 28
    KTJJT 220
    QQQJA 483`

    const extractedHands = extractHandsAndBids(input)

    expect(extractedHands).toEqual([
        {
            hand: '32T3K',
            bid: '765'
        },
        {
            hand: 'T55J5',
            bid: '684'
        },
        {
            hand: 'KK677',
            bid: '28'
        },
        {
            hand: 'KTJJT',
            bid: '220'
        },
        {
            hand: 'QQQJA',
            bid: '483'
        }
    ])
})