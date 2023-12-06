import re
from unittest import skip

RED_PATTERN = re.compile('(\d+) red')
GREEN_PATTERN = re.compile('(\d+) green')
BLUE_PATTERN = re.compile('(\d+) blue')


def parse_eventual_pattern(pattern, round):
    r = pattern.search(round)
    if r == None:
        return None
    return r.groups()[0]


def check_color_by_pattern_within_round(round, pattern, max):
    r = parse_eventual_pattern(pattern, round)
    if r is None:
        return True # no cube = 0 cube
    return int(r) <= max


def check_round(round):
    return check_color_by_pattern_within_round(round, RED_PATTERN, 12) \
        and check_color_by_pattern_within_round(round, GREEN_PATTERN, 13) \
        and check_color_by_pattern_within_round(round, BLUE_PATTERN, 14)


def check_game(param):
    game_nb, all_rounds, rounds = parse_game(param)
    return check_multiple_rounds(rounds)


def parse_game(game):
    parsing = re.match('Game (\d+): (.+)', game)
    game_number = int(parsing.groups()[0])
    all_rounds = parsing.groups()[1]
    rounds = parse_rounds(all_rounds)
    return game_number, all_rounds, rounds


def parse_rounds(all_rounds):
    return [r.strip() for r in all_rounds.split(';')]


def check_multiple_rounds(rounds):
    for r in rounds:
        if not check_round(r):
            return False
    return True


class TestDay2_parsing:
    def test_round_fitting_12reds_single_color(self):
        assert check_color_by_pattern_within_round('12 red', RED_PATTERN, 12)

    def test_round_not_fitting_12reds_single_color(self):
        assert not check_color_by_pattern_within_round('13 red', RED_PATTERN, 12)

    def test_round_fitting_12_reds_mixed_colors(self):
        assert check_color_by_pattern_within_round('12 red, 7 green', RED_PATTERN, 12)
        assert check_color_by_pattern_within_round('2 blue, 12 red, 7 green', RED_PATTERN, 12)

    def test_round_not_fitting_12_reds_mixed_colors(self):
        assert not check_color_by_pattern_within_round('13 red, 9 green', RED_PATTERN, 12)
        assert not check_color_by_pattern_within_round('2 blue, 13 red, 9 green', RED_PATTERN, 12)

    def test_round_fitting_13_greens_mixed_color(self):
        max = 13
        pattern = GREEN_PATTERN
        assert check_color_by_pattern_within_round('12 red, 13 green, 6 blue', pattern, max)

    def test_round_not_fitting_13_greens_mixed_color(self):
        max = 13
        pattern = GREEN_PATTERN
        assert not check_color_by_pattern_within_round('12 red, 14 green, 6 blue', pattern, max)

    def test_round_fitting_14_blues_mixed_colorS(self):
        assert check_color_by_pattern_within_round('12 red, 13 green, 14 blue', BLUE_PATTERN, 14)

    def test_round_not_fitting_14_blues_mixed_colorS(self):
        assert not check_color_by_pattern_within_round('12 red, 13 green, 15 blue', BLUE_PATTERN, 14)
        
    def test_round_fitting_missing_full_colors(self):
        assert check_round('12 red, 13 green, 14 blue')

    def test_round_not_fitting_one_color(self):
        assert not check_round('12 red, 15 green, 14 blue')

    def test_round_fitting_missing_a_color(self):
        assert check_round('13 green, 14 blue')
        assert check_round('12 red, 14 blue')
        assert check_round('12 red, 13 green')

    def test_parse_game(self):
        breakdown = parse_game('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')
        assert breakdown[0] == 1
        assert breakdown[1] == '3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
        assert breakdown[2] == ['3 blue, 4 red','1 red, 2 green, 6 blue','2 green']

    def test_multiple_rounds_fitting(self):
        assert check_multiple_rounds(['3 blue, 4 red','1 red, 2 green, 6 blue','2 green'])


    def test_multiple_rounds_not_fitting(self):
        assert not check_multiple_rounds(['15 blue, 4 red','1 red, 2 green, 6 blue','2 green'])


    def test_game_fitting_multiple_rounds(self):
        assert check_game('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')

    def test_game_not_fitting_multiple_rounds(self):
        assert not check_game('Game 1: 15 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')

