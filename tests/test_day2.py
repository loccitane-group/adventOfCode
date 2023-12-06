from main import is_number, extract_first_number, extract_last_number, extract_calibration, compute_all


class TestDay2:
    def test_detect_number_one_spelled_out(self):
        assert is_number("one", 0) == 1

    def test_detect_number_two_spelled_out(self):
        assert is_number("two", 0) == 2

    def test_detect_number_three_spelled_out(self):
        assert is_number("three", 0) == 3

    def test_detect_4_to_0_numbers_spelled_out(self):
        assert is_number("four", 0) == 4
        assert is_number("five", 0) == 5
        assert is_number("six", 0) == 6
        assert is_number("seven", 0) == 7
        assert is_number("eight", 0) == 8
        assert is_number("nine", 0) == 9
        assert is_number("zero", 0) == 0

    def test_extract_first_number_spelled_out_with_a_string_before(self):
        assert extract_first_number("aone") == 1
    def test_extract_first_number_spelled_out_with_a_string_after(self):
        assert extract_first_number("aonethrer") == 1

    def test_extract_last_number_spelled_out_with_a_string_after(self):
        assert extract_last_number("onethre") == 1
    def test_extract_last_number_spelled_out_with_a_string_before(self):
        assert extract_last_number("aonethre") == 1

    def test_extract_line_first_spelled_out(self):
        assert extract_calibration("aonelkjhlkj2") == 12

    def test_extract_line_last_spelled_out(self):
        assert extract_calibration("a1lkjhlkjthreelkjl") == 13

    def test_extract_line_first_and_last_spelled_out(self):
        assert extract_calibration("aonelkjhlkjthreelkjl") == 13

    def test_calibration_example_part2(self):
        lines='''two1nine
                eightwothree
                abcone2threexyz
                xtwone3four
                4nineeightseven2
                zoneight234
                7pqrstsixteen'''
        assert compute_all(lines) == 281

    def test_full_input(self):
        pass