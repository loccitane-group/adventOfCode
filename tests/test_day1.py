from main import extract_calibration, extract_first_number, is_number, extract_last_number, compute_all

EXAMPLE="""1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
"""


class TestDetectNumbers:
    def test_digit_is_detected(self):
        assert is_number("1",0) == 1
        assert is_number("a",0) == False

    def test_first_number_among_others(self):
        assert extract_first_number("1abc2") == 1
        assert extract_first_number("pqr3stu8vwx") == 3
        assert extract_first_number("a1b2c3d4e5f") == 1
        assert extract_first_number("treb7uchet") == 7

    def test_last_number_among_others(self):
        assert extract_last_number("1abc2") == 2
        assert extract_last_number("pqr3stu8vwx") == 8
        assert extract_last_number("a1b2c3d4e5f") == 5
        assert extract_last_number("treb7uchet") == 7


class TestDay1:
    def test_first_number_is_dozen(self):
        assert extract_calibration("asda7fewt")//10 == 7
        assert extract_calibration("erer23grgr")//10 == 2

    def test_second_number_is_unit(self):
        assert extract_calibration("asda7fewt")%10 == 7
        assert extract_calibration("erer23grgr")%10 == 3

    def test_extract_calibration_in_full(self):
        assert extract_calibration("asda7fewt") == 77
        assert extract_calibration("erer23grgr") == 23

    def test_compute_all_gives_one_result(self):
        assert isinstance(compute_all(EXAMPLE), int)

    def test_compute_all(self):
        assert compute_all(EXAMPLE) == 142

