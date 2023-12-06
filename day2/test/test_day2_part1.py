from day2.logic import GREEN_PATTERN, BLUE_PATTERN, GAMES_EXAMPLE, check_color_by_pattern_within_round, check_round, \
    check_game, parse_game, check_multiple_rounds, process_games_scores, split_game_list, sum_scores, RED_PATTERN


class TestDay2:
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

class TestScoreAggregation:
    def test_parse_game(self):
        breakdown = parse_game('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')
        assert breakdown[0] == 1
        assert breakdown[1] == '3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'
        assert breakdown[2] == ['3 blue, 4 red', '1 red, 2 green, 6 blue', '2 green']

    def test_multiple_rounds_fitting(self):
        assert check_multiple_rounds(['3 blue, 4 red', '1 red, 2 green, 6 blue', '2 green'])

    def test_multiple_rounds_not_fitting(self):
        assert not check_multiple_rounds(['15 blue, 4 red', '1 red, 2 green, 6 blue', '2 green'])

    def test_game_fitting_multiple_rounds_return_id(self):
        assert check_game('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green') == 1
        assert check_game('Game 7: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green') == 7

    def test_game_not_fitting_multiple_rounds_return_zero(self):
        assert check_game('Game 1: 15 blue, 4 red; 1 red, 2 green, 6 blue; 2 green') == 0

    def test_split_game_list(self):
        assert split_game_list(GAMES_EXAMPLE) == [
            'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
            'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
            'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
            'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
            'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'
        ]

    def test_split_game_list_ignore_empty_lines(self):
        assert len(split_game_list("\n" + GAMES_EXAMPLE + "\n")) == 5

    def test_get_possible_games(self):
        assert process_games_scores(GAMES_EXAMPLE) == [1, 2, 0, 0, 5]

    def test_all_game_sum_score(self):
        assert sum_scores(GAMES_EXAMPLE) == 8