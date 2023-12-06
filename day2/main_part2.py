from logic import sum_of_power_min

if __name__ == '__main__':
    # print scores from input file
    with open('input_day2.txt') as f:
        print(sum_of_power_min(f.read()))

