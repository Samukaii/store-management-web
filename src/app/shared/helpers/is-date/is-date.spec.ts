import moment from 'moment';
import { isDate } from "src/app/shared/helpers/is-date/is-date";

describe(isDate.name, () => {
	describe('Valid inputs', () => {
		it('must return true for a valid Date object', () => {
			const validDate = new Date();
			expect(isDate(validDate)).toBeTrue();
		});

		it('must return true for a valid date string', () => {
			const validDateString = '2024-01-01';
			expect(isDate(validDateString)).toBeTrue();
		});

		it('must return true for a Moment object', () => {
			const validMoment = moment();
			expect(isDate(validMoment)).toBeTrue();
		});
	});

	describe('Invalid inputs', () => {
		it('must return false for an invalid date string', () => {
			const invalidDateString = 'invalid-date';
			expect(isDate(invalidDateString)).toBeFalse();
		});

		it('must return false for a number', () => {
			const invalidNumber = 1234567890;
			expect(isDate(invalidNumber)).toBeFalse();
		});

		it('must return false for an object', () => {
			const invalidObject = { date: '2024-01-01' };
			expect(isDate(invalidObject)).toBeFalse();
		});

		it('must return false for null', () => {
			expect(isDate(null)).toBeFalse();
		});

		it('must return false for undefined', () => {
			expect(isDate(undefined)).toBeFalse();
		});
	});

	describe('Edge cases', () => {
		it('must return false for an empty string', () => {
			expect(isDate('')).toBeFalse();
		});

		it('must return false for a string with only spaces', () => {
			expect(isDate('   ')).toBeFalse();
		});

		it('must return true for a timestamp-like string that converts to a valid date', () => {
			const timestampString = '2024-01-01T00:00:00Z';
			expect(isDate(timestampString)).toBeTrue();
		});
	});
});
