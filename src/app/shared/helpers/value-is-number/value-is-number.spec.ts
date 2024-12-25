import { valueIsNumber } from './value-is-number';

describe(valueIsNumber.name, () => {
	describe('When the value is a number', () => {
		it('should return true for a number', () => {
			expect(valueIsNumber(123)).toBe(true);
			expect(valueIsNumber(-456)).toBe(true);
			expect(valueIsNumber(0)).toBe(true);
		});
	});

	describe('When the value is a string', () => {
		it('should return true for a valid numeric string', () => {
			expect(valueIsNumber('123')).toBe(true);
			expect(valueIsNumber('-456')).toBe(true);
			expect(valueIsNumber('0')).toBe(true);
		});

		it('should return false for an empty string', () => {
			expect(valueIsNumber('')).toBe(false);
		});

		it('should return false for a non-numeric string', () => {
			expect(valueIsNumber('abc')).toBe(false);
			expect(valueIsNumber('   ')).toBe(false);
		});
	});

	describe('When the value is not a string or a number', () => {
		it('should return false for a boolean', () => {
			expect(valueIsNumber(true)).toBe(false);
			expect(valueIsNumber(false)).toBe(false);
		});

		it('should return false for null', () => {
			expect(valueIsNumber(null)).toBe(false);
		});

		it('should return false for undefined', () => {
			expect(valueIsNumber(undefined)).toBe(false);
		});

		it('should return false for an object', () => {
			expect(valueIsNumber({})).toBe(false);
		});

		it('should return false for an array', () => {
			expect(valueIsNumber([1, 2, 3])).toBe(false);
		});
	});
});
