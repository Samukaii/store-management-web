import { toIdentifiable } from './to-identifiable';

describe(toIdentifiable.name, () => {
	describe('When receives a valid string number', () => {
		it('must return the number from toNumberOrNull', () => {
			const result = toIdentifiable('123');
			expect(result).toBe(123);
		});
	});

	describe('When receives a number', () => {
		it('must return the number from toNumberOrNull', () => {
			const result = toIdentifiable(123);
			expect(result).toBe(123);
		});
	});

	describe('When the value is a string', () => {
		it('must return the string itself', () => {
			const result = toIdentifiable('Hello World');
			expect(result).toBe('Hello World');
		});
	});

	describe('When the value cannot be converted to a number and is not a string', () => {
		it('must return null for a boolean', () => {
			const result = toIdentifiable(true);
			expect(result).toBeNull();
		});

		it('must return null for an object', () => {
			const result = toIdentifiable({ key: 'value' });
			expect(result).toBeNull();
		});

		it('must return null for an array', () => {
			const result = toIdentifiable([1, 2, 3]);
			expect(result).toBeNull();
		});

		it('must return null for null', () => {
			const result = toIdentifiable(null);
			expect(result).toBeNull();
		});

		it('must return null for undefined', () => {
			const result = toIdentifiable(undefined);
			expect(result).toBeNull();
		});
	});
});
