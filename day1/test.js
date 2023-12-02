const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`

const lines = input.split('\n')

const resultNumber = []

for (var line of lines) {
    let firstDigit, lastDigit;

    for (let i = 0; i < line.length; i++) {
        let char = line.charAt(i);

        if (!isNaN(char)) {
            if (!firstDigit && !lastDigit) {
                firstDigit = char;
            }

            lastDigit = char;
        }
    }

    resultNumber.push(`${firstDigit}${lastDigit}`)
}

var sum = resultNumber.map(char => parseInt(char)).reduce((accumulator, currentValue) => {
    return accumulator + currentValue
  },0);

console.log(sum)

