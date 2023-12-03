function sum(numbers) {
    let sum = 0

    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i]
    }

    return sum
}

function isValidIndex(index, lines) {
    return index >= 0 && index < lines.length
}

const isNumber = x => !isNaN(parseFloat(x)) && isFinite(x)
const isSymbol = x => x && !isNumber(x) && x !== '.'

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
            if (isNumber(char)) {
                tempNumberBuffer += char
            }

            let isEndOfLine = j == engineSchematicLine.length - 1

            if (isEndOfLine || (!isNumber(char) && tempNumberBuffer.length > 0)) {
                let hasAdjacentSymbol = false

                for (var k = -1; k < 2; k++) {
                    for (var l = -tempNumberBuffer.length-1; l < 1; l++) {
                        let surroundedLine = i+k
                        let surroundedRow = j+l
                        let isValidLine = isValidIndex(surroundedLine, engineSchematicLines)
                        let isValidRow = isValidIndex(surroundedRow, engineSchematicLine)

                        if( isValidLine && isValidRow) {
                            let surroundingChar = engineSchematicLines[surroundedLine][surroundedRow]
                            let foundSymbol = isSymbol(surroundingChar)

                            if (foundSymbol) {
                                hasAdjacentSymbol = true
                            }
                        }
                    }
                }

                numbers.push(parseInt(tempNumberBuffer))

                if (hasAdjacentSymbol) {
                    partNumbers.push(parseInt(tempNumberBuffer))
                }

                tempNumberBuffer = ''
            }
        }
    }

    return partNumbers
}

module.exports = {
    sum,
    findAdjacentNumbers
}