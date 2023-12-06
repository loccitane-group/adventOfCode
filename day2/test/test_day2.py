import re
from unittest import skip

RED_PATTERN = re.compile('(\d+) red')
GREEN_PATTERN = re.compile('(\d+) green')
BLUE_PATTERN = re.compile('(\d+) blue')


def parse_pattern(pattern, round):
    return pattern.search(round).groups()[0]


def check_color(round, pattern, max):
    return int(parse_pattern(pattern, round)) <= max


def check_round(round):
    return check_color(round, RED_PATTERN, 12) \
        and check_color(round, GREEN_PATTERN, 13) \
        and check_color(round, BLUE_PATTERN, 14)


class TestDay2_parsing:
    def test_round_fitting_12reds_single_color(self):
        assert check_color('12 red', RED_PATTERN, 12)

    def test_round_not_fitting_12reds_single_color(self):
        assert not check_color('13 red', RED_PATTERN, 12)

    def test_round_fitting_12_reds_mixed_colors(self):
        assert check_color('12 red, 7 green', RED_PATTERN, 12)
        assert check_color('2 blue, 12 red, 7 green', RED_PATTERN, 12)

    def test_round_not_fitting_12_reds_mixed_colors(self):
        assert not check_color('13 red, 9 green', RED_PATTERN, 12)
        assert not check_color('2 blue, 13 red, 9 green', RED_PATTERN, 12)

    def test_round_fitting_13_greens_mixed_color(self):
        max = 13
        pattern = GREEN_PATTERN
        assert check_color('12 red, 13 green, 6 blue', pattern, max)

    def test_round_not_fitting_13_greens_mixed_color(self):
        max = 13
        pattern = GREEN_PATTERN
        assert not check_color('12 red, 14 green, 6 blue', pattern, max)

    def test_round_fitting_14_blues_mixed_colorS(self):
        assert check_color('12 red, 13 green, 14 blue', BLUE_PATTERN, 14)

    def test_round_not_fitting_14_blues_mixed_colorS(self):
        assert not check_color('12 red, 13 green, 15 blue', BLUE_PATTERN, 14)
        
    def test_round_fitting_missing_full_colors(self):
        assert check_round('12 red, 13 green, 14 blue')

    def test_round_not_fitting_one_color(self):
        assert not check_round('12 red, 15 green, 14 blue')

    @skip
    def test_round_fitting_missing_red(self):
        assert check_round('13 green, 14 blue')