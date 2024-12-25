import { toNumberOrNull } from './to-number-or-null'; // Ajuste o caminho conforme necessário

describe(toNumberOrNull.name, () => {
	describe('When the value is a valid number', () => {
		it('should return the number itself', () => {
			const result = toNumberOrNull(123);
			expect(result).toBe(123); // Expect the number to be returned unchanged
		});
	});

	describe('When the value is a string representing a valid number', () => {
		it('should return the number representation of the string', () => {
			const result = toNumberOrNull('123');
			expect(result).toBe(123); // Expect the string '123' to be converted to the number 123
		});
	});

	describe('When the value is an empty string', () => {
		it('should return null', () => {
			const result = toNumberOrNull('');
			expect(result).toBeNull(); // Expect an empty string to return null
		});
	});

	describe('When the value is not a number or a string representing a number', () => {
		it('should return null for a boolean', () => {
			const result = toNumberOrNull(true);
			expect(result).toBeNull(); // Expect a boolean to return null
		});

		it('should return null for an object', () => {
			const result = toNumberOrNull({ key: 'value' });
			expect(result).toBeNull(); // Expect an object to return null
		});

		it('should return null for an array', () => {
			const result = toNumberOrNull([1, 2, 3]);
			expect(result).toBeNull(); // Expect an array to return null
		});

		it('should return null for null', () => {
			const result = toNumberOrNull(null);
			expect(result).toBeNull(); // Expect null to return null
		});

		it('should return null for undefined', () => {
			const result = toNumberOrNull(undefined);
			expect(result).toBeNull(); // Expect undefined to return null
		});

		it('should return null for a string with non-numeric content', () => {
			const result = toNumberOrNull('abc');
			expect(result).toBeNull(); // Expect a non-numeric string to return null
		});
	});
});
