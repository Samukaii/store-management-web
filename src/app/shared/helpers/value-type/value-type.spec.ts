import { valueType } from './value-type';

describe(valueType.name, () => {
	it('must return the default value when provided', () => {
		const result = valueType(5);
		expect(result).toBe(5);
	});

	it('must return null when no default value is provided', () => {
		const result = valueType();
		expect(result).toBeNull();
	});

	it('must return the correct type when the default value is provided as a string', () => {
		const result = valueType('Hello');
		expect(result).toBe('Hello');
	});

	it('must handle a default value of an object', () => {
		const result = valueType({ name: 'John' });
		expect(result).toEqual({ name: 'John' });
	});
});
