import { toDateOrNull } from './to-date-or-null';
import moment from "moment";

describe(toDateOrNull.name, () => {
	describe('When input is a valid Date', () => {
		it('should return the same Date object', () => {
			const date = new Date(2024, 11, 25); // 25th December 2024
			const result = toDateOrNull(date);
			expect(result).toEqual(date); // Should return the exact same date object
		});
	});

	describe('When input is a valid Moment object', () => {
		it('should return the equivalent Date object', () => {
			const momentDate = moment('2024-12-25'); // 25th December 2024
			const result = toDateOrNull(momentDate);
			expect(result).toEqual(momentDate.toDate()); // Should convert to the equivalent Date object
		});
	});

	describe('When input is a valid Date string', () => {
		it('should return the corresponding Date object', () => {
			const dateString = '2024-12-25T00:00:00Z'; // ISO string format
			const result = toDateOrNull(dateString);
			expect(result).toEqual(new Date(dateString)); // Should convert to the Date object
		});
	});

	describe('When input is an invalid Date string', () => {
		it('should return null', () => {
			const invalidDateString = 'invalid-date';
			const result = toDateOrNull(invalidDateString);
			expect(result).toBeNull(); // Should return null for an invalid date string
		});
	});

	describe('When input is a non-date value', () => {
		it('should return null for a number', () => {
			const result = toDateOrNull(123);
			expect(result).toBeNull(); // Should return null for non-date values like numbers
		});

		it('should return null for an object', () => {
			const result = toDateOrNull({ key: 'value' });
			expect(result).toBeNull(); // Should return null for objects
		});

		it('should return null for null or undefined', () => {
			const result1 = toDateOrNull(null);
			const result2 = toDateOrNull(undefined);
			expect(result1).toBeNull(); // Should return null for null
			expect(result2).toBeNull(); // Should return null for undefined
		});
	});
});
