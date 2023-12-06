from logic import sum_scores

if __name__ == '__main__':
    # print scores from input file
    with open('input_day2.txt') as f:
        print(sum_scores(f.read()))

