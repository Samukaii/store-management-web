import { valueType } from './value-type';

describe(valueType.name, () => {
	it('should return the default value when provided', () => {
		const result = valueType(5);
		expect(result).toBe(5);
	});

	it('should return null when no default value is provided', () => {
		const result = valueType();
		expect(result).toBeNull();
	});

	it('should return the correct type when the default value is provided as a string', () => {
		const result = valueType('Hello');
		expect(result).toBe('Hello');
	});

	it('should handle a default value of an object', () => {
		const result = valueType({ name: 'John' });
		expect(result).toEqual({ name: 'John' });
	});
});
