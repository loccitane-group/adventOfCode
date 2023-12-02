const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`


const lines = input.split('\n')

const resultNumber = []

for (var line of lines) {

    line = line.replaceAll('twone', '2')
    line = line.replaceAll('threeight', '3')
    line = line.replaceAll('oneight', '1')
    line = line.replaceAll('fiveight', '5')
    line = line.replaceAll('nineight', '9')
    line = line.replaceAll('sevenine', '7')
    line = line.replaceAll('eighthree', '8')
    line = line.replaceAll('eightwo', '8')

    line = line.replaceAll('one', '1')
    line = line.replaceAll('two', '2')
    line = line.replaceAll('three', '3')
    line = line.replaceAll('four', '4')
    line = line.replaceAll('five', '5')
    line = line.replaceAll('six', '6')
    line = line.replaceAll('seven', '7')
    line = line.replaceAll('eight', '8')
    line = line.replaceAll('nine', '9')

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


