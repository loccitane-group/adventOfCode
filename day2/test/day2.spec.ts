import { describe, expect, it } from 'vitest';

const getGameId = (gameName: string): number => {
    const [, gameId] = gameName.split(' ');
    return Number(gameId);
};

const parseGameSets = (setsDescription: string) =>
    setsDescription.split(';').map((set) => {
        return set.split(',').map((cubeSelection) => {
            return cubeSelection.trim();
        });
    });

const getCubeAmount = (setsDescription: string, cubeColor: string) => {
    const redCube = parseGameSets(setsDescription);
    return redCube.reduce((accumulator, currentSet) => {
        currentSet.forEach((cubeSelection) => {
            const [quantity, color] = cubeSelection.split(' ');
            if (color === cubeColor) accumulator += Number(quantity);
        });
        return accumulator;
    }, 0);
};

type Game = {
    id: number;
    red: number;
    green: number;
    blue: number;
};

const parseGame = (gameDescription: string): Game => {
    const [gameName, setsDescription] = gameDescription.split(':');
    return {
        id: getGameId(gameName),
        red: getCubeAmount(setsDescription, 'red'),
        green: getCubeAmount(setsDescription, 'green'),
        blue: getCubeAmount(setsDescription, 'blue'),
    };
};

type BagContent = {
    red: number;
    green: number;
    blue: number;
};

const isGamePossible = (game: Game, bagContent: BagContent): boolean => {
    return !(game.red > bagContent.red || game.green > bagContent.green || game.blue > bagContent.blue);
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
    it('Should parse a complete game', () => {
        expect(parseGame('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')).toEqual({
            id: 1,
            red: 5,
            green: 4,
            blue: 9,
        });
    });
    it('Should valid a valid game', () => {
        const game: Game = {
            id: 1,
            red: 5,
            green: 4,
            blue: 9,
        };
        const bagContent: BagContent = {
            red: 5,
            green: 4,
            blue: 9,
        };
        expect(isGamePossible(game, bagContent)).toBe(true);
    });
    it('Should not valid a invalid game', () => {
        const game: Game = {
            id: 1,
            red: 500,
            green: 4,
            blue: 9,
        };
        const bagContent: BagContent = {
            red: 5,
            green: 4,
            blue: 9,
        };
        expect(isGamePossible(game, bagContent)).toBe(false);
    });
});
