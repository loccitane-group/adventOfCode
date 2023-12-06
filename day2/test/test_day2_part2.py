from day2.logic import check_minimum_set_per_game, GAMES_EXAMPLE, power_of_minimum, sum_of_power_min


class TestDay2Part2:
    def test_minimum_set_red_one_round(self):
        assert check_minimum_set_per_game('Game 1: 2 red, 7 green, 6 blue')['red'] == 2

    def test_minimum_set_red_two_rounds(self):
        assert check_minimum_set_per_game('Game 1: 2 red, 7 green, 6 blue; 3 red, 3 green, 4 blue')['red'] == 3

    def test_minimum_set_red_no_red(self):
        assert check_minimum_set_per_game('Game 1: 7 green, 6 blue')['red'] == 0

    def test_minimum_set_one_round_all(self):
        assert check_minimum_set_per_game('Game 1: 2 red, 7 green, 6 blue')['red'] == 2
        assert check_minimum_set_per_game('Game 1: 2 red, 7 green, 6 blue')['green'] == 7
        assert check_minimum_set_per_game('Game 1: 2 red, 7 green, 6 blue')['blue'] == 6

    def test_minimum_set_multiple_rounds_all_example1(self):
        example = GAMES_EXAMPLE.splitlines()[0]
        assert check_minimum_set_per_game(example) == {'red': 4, 'green': 2, 'blue': 6}

    def test_power_of_minimum_example1(self):
        example = GAMES_EXAMPLE.splitlines()[0]
        assert power_of_minimum(example) == 48

    def test_power_of_minimum_example2(self):
        example = GAMES_EXAMPLE.splitlines()[1]
        assert power_of_minimum(example) == 12

    def test_power_of_minimum_example3(self):
        example = GAMES_EXAMPLE.splitlines()[2]
        assert power_of_minimum(example) == 1560

    def test_power_of_minimum_example4(self):
        example = GAMES_EXAMPLE.splitlines()[3]
        assert power_of_minimum(example) == 630

    def test_power_of_minimum_example5(self):
        example = GAMES_EXAMPLE.splitlines()[4]
        assert power_of_minimum(example) == 36

    def test_sum_of_power_of_minimum(self):
        assert sum_of_power_min(GAMES_EXAMPLE) == 2286