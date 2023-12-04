import { describe, expect, it } from 'vitest';
import { puzzle } from '../src';

function estUnNombre(value: string) {
    return !Number.isNaN(Number(value));
}
function calibrationValue(puzzleLine: string) {
    let calibration = '';
    const digitInFullText = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

    for (let characterIndex = 0; characterIndex < puzzleLine.length; characterIndex++) {
        const currentCharacter = puzzleLine[characterIndex];

        if (estUnNombre(currentCharacter)) {
            calibration += currentCharacter;
        }

        const lineSubstring = puzzleLine.substring(characterIndex);
        for (let d = 0; d < digitInFullText.length; d++) {
            const textDigit = digitInFullText[d];
            if (lineSubstring.startsWith(textDigit)) {
                calibration += String(d + 1);
            }
        }
    }
    const firstDigit = calibration.at(0);
    const lastDigit = calibration.at(-1);

    return Number(`${firstDigit}${lastDigit}`);
}

describe('Day 1 ADVOC2023', () => {
    it('je veux obtenir 12 pour 1abc2', () => {
        expect(calibrationValue('1abc2')).toEqual(12);
    });

    it('je veux obtenir 13 pour 1abc3', () => {
        expect(calibrationValue('1abc3')).toEqual(13);
    });
    it('je veux obtenir 23 pour 2abc3', () => {
        expect(calibrationValue('2abc3')).toEqual(23);
    });
    it('je veux obtenir 95 pour 9abc5', () => {
        expect(calibrationValue('9abc5')).toEqual(95);
    });
    it('je veux obtenir 38 pour pqr3stu8vwx', () => {
        expect(calibrationValue('pqr3stu8vwx')).toEqual(38);
    });
    it('je veux obtenir 15 pour a1b2c3d4e5f', () => {
        expect(calibrationValue('a1b2c3d4e5f')).toEqual(15);
    });
    it('je veux obtenir 77 pour treb7uchet', () => {
        expect(calibrationValue('treb7uchet')).toEqual(77);
    });

    it('je veux obtenir 29 pour two1nine', () => {
        expect(calibrationValue('two1nine')).toEqual(29);
    });

    it('je veux obtenir 83 pour eightwothree', () => {
        expect(calibrationValue('eightwothree')).toEqual(83);
    });

    it('je veux obtenir 13 pour abcone2threexyz', () => {
        expect(calibrationValue('abcone2threexyz')).toEqual(13);
    });

    it('je veux obtenir 24 pour xtwone3four', () => {
        expect(calibrationValue('xtwone3four')).toEqual(24);
    });

    it('je veux obtenir 42 pour 4nineeightseven2', () => {
        expect(calibrationValue('4nineeightseven2')).toEqual(42);
    });

    it('je veux obtenir 14 pour zoneight234', () => {
        expect(calibrationValue('zoneight234')).toEqual(14);
    });

    it('je veux obtenir 76 pour 7pqrstsixteen', () => {
        expect(calibrationValue('7pqrstsixteen')).toEqual(76);
    });

    it('je veux obtenir 98 pour nineight', () => {
        expect(calibrationValue('nineight')).toEqual(98);
    });

    it('je veux obtenir 82 pour eightwo', () => {
        expect(calibrationValue('eightwo')).toEqual(82);
    });

    it('Résultat du puzzle', () => {
        const somme = puzzle.map(calibrationValue).reduce((a: number, b: number) => a + b);

        console.log(somme);
    });
});
