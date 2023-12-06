import re

RED_PATTERN = re.compile('(\d+) red')
GREEN_PATTERN = re.compile('(\d+) green')
BLUE_PATTERN = re.compile('(\d+) blue')


def check_game(line):
    pass


def check_round_on_reds(round):
    return int(parse_red_count(round)) <= 12


def parse_red_count(round):
    return RED_PATTERN.search(round).groups()[0]


def parse_green_count(round):
    return GREEN_PATTERN.search(round).groups()[0]



def check_round_on_greens(round):
    return int(parse_green_count(round)) <= 13


def parse_blue_count(round):
    return BLUE_PATTERN.search(round).groups()[0]



def check_round_on_blues(round):
    return int(parse_blue_count(round)) <= 14


class TestDay2_parsing:
    def test_round_fitting_12reds_single_color(self):
        assert check_round_on_reds('12 red')

    def test_round_not_fitting_12reds_single_color(self):
        assert not check_round_on_reds('13 red')

    def test_round_fitting_12_reds_mixed_colors(self):
        assert check_round_on_reds('12 red, 7 green')
        assert check_round_on_reds('2 blue, 12 red, 7 green')

    def test_round_not_fitting_12_reds_mixed_colors(self):
        assert not check_round_on_reds('13 red, 9 green')
        assert not check_round_on_reds('2 blue, 13 red, 9 green')

    def test_round_fitting_13_greens_mixed_color(self):
        assert check_round_on_greens('12 red, 13 green, 6 blue')

    def test_round_not_fitting_13_greens_mixed_color(self):
        assert not check_round_on_greens('12 red, 14 green, 6 blue')

    def test_round_fitting_14_blues_mixed_colorS(self):
        assert check_round_on_blues('12 red, 13 green, 14 blue')

    def test_round_not_fitting_14_blues_mixed_colorS(self):
        assert not check_round_on_blues('12 red, 13 green, 15 blue')