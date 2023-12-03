function sum(numbers) {
    let sum = 0

    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i]
    }

    return sum
}

/*

    given the following engine schematic:
    467..114..
    ...*......
    ..35..633.
    ......#...
    617*......
    .....+.58.
    ..592.....
    ......755.
    ...$.*....
    .664.598..

    should find any number that is adjacent  to any symbol except for the dot
    and return them in an array

    in the above example the result should be:
    [
        467,
        35,
        633,
        617,
        592,
        755,
        664,
        598
    ]
*/
function findAdjacentNumbers (engineSchematic) {
    const numbers = []
    const partNumbers = []

    let tempNumberBuffer = ''

    const engineSchematicLines = engineSchematic.split('\n').map(x => x.trim())

    for (let i = 0; i < engineSchematicLines.length; i++) {
        const engineSchematicLine = engineSchematicLines[i]

        for (let j = 0; j < engineSchematicLine.length; j++) {
            const char = engineSchematicLine[j]
    
            // While reading the number store it in a buffer
            if (isNumber(parseInt(char))) {
                tempNumberBuffer += char
            }
            // If we encounter a dot, we know the number is over
            else {
                if (tempNumberBuffer.length > 0) {
                    numbers.push(parseInt(tempNumberBuffer))
    
                    let hasAdjacentSymbol = false
                    // Check right
                    hasAdjacentSymbol = hasAdjacentSymbol || isSymbol(engineSchematicLine[j])
                    // Check left
                    hasAdjacentSymbol = hasAdjacentSymbol || isSymbol(engineSchematicLine[j - tempNumberBuffer.length - 1])
                    // Check diagonal top right
                    hasAdjacentSymbol = hasAdjacentSymbol
                                            || (engineSchematicLines[i-1] && engineSchematicLines[i-1][j] && isSymbol(engineSchematicLines[i-1][j]))
                    // Check diagonal bottom right
                    hasAdjacentSymbol = hasAdjacentSymbol
                                        || (engineSchematicLines[i+1] && engineSchematicLines[i+1][j] && isSymbol(engineSchematicLines[i+1][j]))
                    // Check diagonal top left
                    hasAdjacentSymbol = hasAdjacentSymbol
                                        || (engineSchematicLines[i-1] && engineSchematicLines[i-1][j - tempNumberBuffer.length - 1] && isSymbol(engineSchematicLines[i-1][j - tempNumberBuffer.length - 1]))
                    // Check diagonal top left
                    hasAdjacentSymbol = hasAdjacentSymbol
                                        || (engineSchematicLines[i+1] && engineSchematicLines[i+1][j - tempNumberBuffer.length - 1] && isSymbol(engineSchematicLines[i+1][j - tempNumberBuffer.length - 1]))
    
                    // Check bottom and top symbols for each number of the tempBufferNumber
                    for (var k = 0; k < tempNumberBuffer.length; k++) {
                        // Check top line
                        hasAdjacentSymbol = hasAdjacentSymbol
                                            || (engineSchematicLines[i-1] && engineSchematicLines[i-1][j - k - 1] && isSymbol(engineSchematicLines[i-1][j - k - 1]))

                        // Check bottom line
                        hasAdjacentSymbol = hasAdjacentSymbol
                                            || (engineSchematicLines[i+1] && engineSchematicLines[i+1][j - k - 1] && isSymbol(engineSchematicLines[i+1][j - k - 1]))
                    }

                    if (hasAdjacentSymbol) {
                        partNumbers.push(parseInt(tempNumberBuffer))
                    }

                    tempNumberBuffer = ''
                }
            }
        }
    }

    return partNumbers
}

const isNumber = x => Number.isInteger(x)
const isDot = x => x === '.'
const isSymbol = x => x && !isNumber(x) && !isDot(x)

module.exports = {
    sum,
    findAdjacentNumbers
}