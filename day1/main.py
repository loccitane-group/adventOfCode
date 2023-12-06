# This is a sample Python script.
import re
import sys

NUMBERS_SPELLED_OUT_DICT = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7, "eight": 8, "nine": 9, "zero":0}
NUMBERS_SPELLED_OUT_RE = re.compile("(one|two|three|four|five|six|seven|eight|nine|zero)")


# Press ⌃R to execute it or replace it with your code.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.


def print_hi(name):
    # Use a breakpoint in the code line below to debug your script.
    print(f'Hi, {name}')  # Press ⌘F8 to toggle the breakpoint.


# See PyCharm help at https://www.jetbrains.com/help/pycharm/

def extract_last_number(param):
    for i in range(len(param) - 1, -1, -1):
        if n := is_number(param, i):
            return n


def is_number(line, i):
    if match:=NUMBERS_SPELLED_OUT_RE.match(line,i):
        return NUMBERS_SPELLED_OUT_DICT[match[0]]

    if (n := line[i]).isdigit():
        return int(n)
    else:
        return False


def extract_first_number(param):
    for i in range(len(param)):
        if n := is_number(param, i):
            return n


def extract_calibration(param):
    return extract_first_number(param) * 10 \
        + extract_last_number(param)


def compute_all(EXAMPLE):
    sum = 0
    for line in EXAMPLE.splitlines():
        sum += extract_calibration(line)
    return sum


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    filename = sys.argv[1]
    with open(filename) as f:
        print(compute_all(f.read()))
