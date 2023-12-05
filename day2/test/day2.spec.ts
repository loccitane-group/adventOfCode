import { describe, expect, it } from 'vitest';
import { games } from '../src';

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
    const coloredCube = parseGameSets(setsDescription);
    return coloredCube.reduce((maxAmount, currentSet) => {
        currentSet.forEach((cubeSelection) => {
            const [quantity, color] = cubeSelection.split(' ');
            if (color === cubeColor) maxAmount = maxAmount > Number(quantity) ? maxAmount : Number(quantity);
        });
        return maxAmount;
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

const sumInvalidGamesId = (gamesRecord: string[]): number => {
    const badContent: BagContent = {
        red: 12,
        green: 13,
        blue: 14,
    };
    return gamesRecord.reduce((accumulator, gameRecord) => {
        const currentGame: Game = parseGame(gameRecord);
        if (isGamePossible(currentGame, badContent)) {
            accumulator += currentGame.id;
        }
        return accumulator;
    }, 0);
};

const findGamePower = (gamesRecord: string): number => {
    const parsedGame = parseGame(gamesRecord);
    return parsedGame.red * parsedGame.green * parsedGame.blue;
};

const sumGamesPower = (gamesRecord: string[]) => {
    return gamesRecord.reduce((accumulator, gameRecord) => {
        accumulator += findGamePower(gameRecord);
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
        expect(getCubeAmount(' 2 blue, 3 red; 2 blue, 3 red', 'red')).toEqual(3);
    });
    it('Should get the blue cube amount when game contains multiple sets', () => {
        expect(getCubeAmount(' 2 blue, 3 red; 4 blue, 3 red', 'blue')).toEqual(4);
    });
    it('Should parse a complete game', () => {
        expect(parseGame('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')).toEqual({
            id: 1,
            red: 4,
            green: 2,
            blue: 6,
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
    it('should solve record in doc part 1', () => {
        const gameRecord = [
            'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
            'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
            'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
            'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
            'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
        ];
        expect(sumInvalidGamesId(gameRecord)).toEqual(8);
    });

    it('should solve game record of day2 part1', () => {
        expect(sumInvalidGamesId(games)).toEqual(2416);
    });

    it('Should find the power of a game', () => {
        expect(findGamePower('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')).toEqual(48);
    });

    it('should solve record in doc part 2', () => {
        const gameRecord = [
            'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
            'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
            'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
            'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
            'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
        ];
        expect(sumGamesPower(gameRecord)).toEqual(2286);
    });

    it('should solve game record of day2 part2', () => {
        expect(sumGamesPower(games)).toEqual(63307);
    });
});
