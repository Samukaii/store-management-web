import { timeIsValid } from "src/app/shared/helpers/time-is-valid/time-is-valid";

describe(timeIsValid.name, () => {
	it('must return false when time has no ":"', () => {
		expect(timeIsValid("12")).toBe(false);
	});

	it('must return false when has more than one ":"', () => {
		expect(timeIsValid("12:23:12")).toBe(false);
	});

	it('must return false when hours or minutes are not numbers', () => {
		expect(timeIsValid("qwe:abs")).toBe(false);
	});

	it('must return false when hours is greater than 23 and less than 0', () => {
		expect(timeIsValid("25:15")).toBe(false);
		expect(timeIsValid("-1:15")).toBe(false);
	});

	it('must return false when minutes is greater than 59 and less than 0', () => {
		expect(timeIsValid("13:-212")).toBe(false);
		expect(timeIsValid("13:60")).toBe(false);
		expect(timeIsValid("13:90")).toBe(false);
	});

	it('must return true when all are valid', () => {
		expect(timeIsValid("12:44")).toBe(true);
		expect(timeIsValid("00:12")).toBe(true);
		expect(timeIsValid("00:59")).toBe(true);
		expect(timeIsValid("01:32")).toBe(true);
		expect(timeIsValid("23:59")).toBe(true);
		expect(timeIsValid("00:00")).toBe(true);
	});
});
