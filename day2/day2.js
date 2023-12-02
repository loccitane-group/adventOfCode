function findPossibleGames(gameRecords, { nbGreenCubes, nbBlueCubes, nbRedCubes }) {
    return ['Game 1', 'Game 2', 'Game 3', 'Game 4', 'Game 5']
}

function sumOfGameIds(gameIds) {
    let sum = 0

    for (let i = 0; i < gameIds.length; i++) {
        const gameId = gameIds[i]
        const gameIdNumber = parseInt(gameId.split(' ')[1])
        sum += gameIdNumber
    }

    return sum
}

module.exports = {
    sumOfGameIds,
    findPossibleGames
}