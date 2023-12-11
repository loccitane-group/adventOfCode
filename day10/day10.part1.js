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

module.exports = {
    mapTiles
}