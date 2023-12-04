import { describe, expect, it } from 'vitest';

const getGameId = (gameName: string): number => {
    return Number(gameName.split(' ')[1]);
};

describe('Day 2 ADVOC2023', () => {
    it('Should set the game id', () => {
        expect(getGameId('Game 1')).toEqual(1);
    });
});
