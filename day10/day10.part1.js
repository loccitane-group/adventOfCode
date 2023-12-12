function mapTiles(tiles) {
    const map = new Map()

    tiles.split('\n').map(l => l.trim()).forEach((line, y) => {
        line.split('').forEach((tile, x) => {
            if (tile !== '.') {
                map.set(`${x},${y}`, tile)
            }
        })
    })

    return map
}

function findStartingPosition(tiles) {
    const map = mapTiles(tiles)

    for (let [position, tile] of map.entries()) {
        if (tile === 'S') {
            const [x, y] = position.split(',').map(x => parseInt(x))
            return {
                x,
                y
            }
        }
    }
}

module.exports = {
    mapTiles,
    findStartingPosition
}