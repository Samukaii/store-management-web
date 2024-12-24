import { capitalize } from "src/app/shared/helpers/capitalize/capitalize";

describe(capitalize.name, () => {
	it('must return texts capitalized', () => {
		expect(capitalize('test')).toBe('Test');
		expect(capitalize('A')).toBe('A');
		expect(capitalize('abc')).toBe('Abc');
		expect(capitalize('123')).toBe('123');
		expect(capitalize('some sentence')).toBe('Some sentence');
	});
});
