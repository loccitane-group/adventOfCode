import re

GREEN_PATTERN = re.compile('(\d+) green')
BLUE_PATTERN = re.compile('(\d+) blue')
GAMES_EXAMPLE = """Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"""


def parse_eventual_pattern(pattern, round):
    r = pattern.search(round)
    if r == None:
        return None
    return r.groups()[0]


def check_color_by_pattern_within_round(round, pattern, max):
    r = parse_eventual_pattern(pattern, round)
    if r is None:
        return True  # no cube = 0 cube
    return int(r) <= max


def check_round(round):
    return check_color_by_pattern_within_round(round, RED_PATTERN, 12) \
        and check_color_by_pattern_within_round(round, GREEN_PATTERN, 13) \
        and check_color_by_pattern_within_round(round, BLUE_PATTERN, 14)


def check_game(param):
    game_id, all_rounds, rounds = parse_game(param)
    if not check_multiple_rounds(rounds):
        return 0
    return game_id


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


def process_games_scores(games):
    return [check_game(g) for g in split_game_list(games)]


def split_game_list(games):
    return [g for g in games.splitlines() if g != '']


def sum_scores(games_list):
    return sum(process_games_scores(games_list))


RED_PATTERN = re.compile('(\d+) red')

if __name__ == '__main__':
    # print scores from input file
    with open('input_day2.txt') as f:
        print(sum_scores(f.read()))