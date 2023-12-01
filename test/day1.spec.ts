import { describe, expect, it } from 'vitest';
import { puzzle } from '../src';

function estUnNombre(value: string) {
    return !Number.isNaN(Number(value));
}
function calibrationValue(puzzleLine: string) {
    let calibration = '';

    for (let position = 0; position < puzzleLine.length; position++) {
        const value = puzzleLine[position];
        if (estUnNombre(value)) {
            calibration = calibration + value;
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

    it('je veux obtenir 77 pour treb7uchet', () => {
        const somme = puzzle.map(calibrationValue).reduce((a: number, b: number) => a + b);

        console.log(somme);
    });
});
