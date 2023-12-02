function findPossibleGames(rawGameRecords, { nbRedCubes, nbGreenCubes, nbBlueCubes,  }) {
    const possibleGames = []

    const gameRecordLines = rawGameRecords.split('\n')
    const gameRecords = gameRecordLines.map(line => ({
        gameId: line.split(':')[0].trim(),
        rounds: line.split(':')[1].trim().split(';')
    }))

    for (let i = 0; i < gameRecords.length; i++) {
        const gameRecord = gameRecords[i]
        const rounds = gameRecord.rounds
        const nbTotalRounds = rounds.length
        let nbPossibleRounds = 0
        
        for (let j = 0; j < rounds.length; j++) {
            let requiredNbGreenCubes = 0
            let requiredNbBlueCubes = 0
            let requiredNbRedCubes = 0

            const round = rounds[j]
            const cubes = round.split(',').map(cube => cube.trim())

            for (let k = 0; k < cubes.length; k++) {
                const cube = cubes[k]
                const color = cube.split(' ')[1]
                const nbCubes = parseInt(cube.split(' ')[0])

                if (color === 'green') {
                    requiredNbGreenCubes += nbCubes
                } else if (color === 'blue') {
                    requiredNbBlueCubes += nbCubes
                } else if (color === 'red') {
                    requiredNbRedCubes += nbCubes
                }
            }

            if (requiredNbGreenCubes <= nbGreenCubes && requiredNbBlueCubes <= nbBlueCubes && requiredNbRedCubes <= nbRedCubes) {
                nbPossibleRounds++
            }
        }

        if (nbPossibleRounds === nbTotalRounds) {
            possibleGames.push(gameRecord.gameId)
        }

    }
    
    return possibleGames
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

function sumOfPowers(powers) {
    let sum = 0

    for (let i = 0; i < powers.length; i++) {
        const power = powers[i]
        sum += power
    }

    return sum

}

function findMinimumSetOfCubes(rawGameRecords) {
    const powers = []

    const gameRecordLines = rawGameRecords.split('\n')
    const gameRecords = gameRecordLines.map(line => ({
        gameId: line.split(':')[0].trim(),
        rounds: line.split(':')[1].trim().split(';')
    }))

    for (let i = 0; i < gameRecords.length; i++) {
        const gameRecord = gameRecords[i]
        const rounds = gameRecord.rounds
        let requiredNbGreenCubes = 0
        let requiredNbBlueCubes = 0
        let requiredNbRedCubes = 0
        
        for (let j = 0; j < rounds.length; j++) {
            const round = rounds[j]
            const cubes = round.split(',').map(cube => cube.trim())

            for (let k = 0; k < cubes.length; k++) {
                const cube = cubes[k]
                const color = cube.split(' ')[1]
                const nbCubes = parseInt(cube.split(' ')[0])

                if (color === 'green' && nbCubes > requiredNbGreenCubes) {
                    requiredNbGreenCubes = nbCubes
                } else if (color === 'blue' && nbCubes > requiredNbBlueCubes) {
                    requiredNbBlueCubes = nbCubes
                } else if (color === 'red' && nbCubes > requiredNbRedCubes) {
                    requiredNbRedCubes = nbCubes
                }
            }
        }

        powers.push(requiredNbGreenCubes * requiredNbBlueCubes * requiredNbRedCubes)
    }
    
    return powers
}


module.exports = {
    sumOfGameIds,
    findPossibleGames,
    sumOfPowers,
    findMinimumSetOfCubes
}