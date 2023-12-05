import { describe, expect, it } from 'vitest';

const getGameId = (gameName: string): number => {
    const [, gameId] = gameName.split(' ');
    return Number(gameId);
};

const parseGameSets = (cubePickedInGame: string) =>
    cubePickedInGame.split(';').map((set) => {
        return set.split(',').map((cubeSelection) => {
            return cubeSelection.trim();
        });
    });

const getCubeAmount = (cubePickedInGame: string, cubeColor: string) => {
    const redCube = parseGameSets(cubePickedInGame);
    return redCube.reduce((accumulator, currentSet) => {
        currentSet.forEach((cubeSelection) => {
            const [quantity, color] = cubeSelection.split(' ');
            if (color === cubeColor) accumulator += Number(quantity);
        });
        return accumulator;
    }, 0);
};

describe('Day 2 ADVOC2023', () => {
    it('Should get the game id', () => {
        expect(getGameId('Game 1')).toEqual(1);
    });
    it('Should get the red cube amount', () => {
        expect(getCubeAmount(' 2 red', 'red')).toEqual(2);
    });
    it('Should get the red cube amount when set contains multiple colors', () => {
        expect(getCubeAmount(' 2 blue, 3 red', 'red')).toEqual(3);
    });
    it('Should correctly parse game sets', () => {
        expect(parseGameSets(' 2 blue, 3 red; 2 blue, 3 red')).toEqual([
            ['2 blue', '3 red'],
            ['2 blue', '3 red'],
        ]);
    });
    it('Should get the red cube amount when game contains multiple sets', () => {
        expect(getCubeAmount(' 2 blue, 3 red; 2 blue, 3 red', 'red')).toEqual(6);
    });
    it('Should get the blue cube amount when game contains multiple sets', () => {
        expect(getCubeAmount(' 2 blue, 3 red; 2 blue, 3 red', 'blue')).toEqual(4);
    });
});
