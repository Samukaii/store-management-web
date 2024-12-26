import { timeToMinutes } from "src/app/shared/helpers/time-to-minutes/time-to-minutes";

describe(timeToMinutes.name, () => {
	describe('Invalid values', () => {
		it('must throw an error if time has no ":"', () => {
			expect(() => timeToMinutes("12312")).toThrow("Invalid time");
		});

		it('must throw an error if time hour or minutes are not number', () => {
			expect(() => timeToMinutes("dfg:adqwe")).toThrow("Invalid time");
			expect(() => timeToMinutes("12:13:43")).toThrow("Invalid time");
		});

		it('must throw an error if hour or minutes are invalid', () => {
			expect(() => timeToMinutes("-23:12")).toThrow("Invalid time");
			expect(() => timeToMinutes("90:43")).toThrow("Invalid time");
			expect(() => timeToMinutes("12:-23")).toThrow("Invalid time");
			expect(() => timeToMinutes("11:-89")).toThrow("Invalid time");
		});
	});

	describe('Valid values', () => {
		it('must return time as minutes', () => {
			expect(timeToMinutes("00:13")).toBe(13);
			expect(timeToMinutes("00:59")).toBe(59);
			expect(timeToMinutes("3:42")).toBe(222);
			expect(timeToMinutes("23:15")).toBe(1395);
		});
	})
});
