import { describe, expect, it } from 'vitest';

const getGameId = (gameName: string): number => {
    return Number(gameName.split(' ')[1]);
};

const getRedCubeAmount = (cubePickedInGame: string) => {
    const redCube = cubePickedInGame
        .split(',')
        .map((cubeSelection) => cubeSelection.trim())
        .filter((cubeSelection) => cubeSelection.includes('red'));
    return Number(redCube[0].split(' ')[0]);
};

describe('Day 2 ADVOC2023', () => {
    it('Should get the game id', () => {
        expect(getGameId('Game 1')).toEqual(1);
    });
    it('Should get the red cube amount', () => {
        expect(getRedCubeAmount(' 2 red')).toEqual(2);
    });
    it('Should get the red cube amount when other colors', () => {
        expect(getRedCubeAmount(' 2 blue, 3 red')).toEqual(3);
    });
});
