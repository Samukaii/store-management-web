import { camelToKebab } from "src/app/shared/helpers/camel-to-kebab/camel-to-kebab";

describe(camelToKebab.name, () => {
	it('must convert camelCase to kebab-case', () => {
		expect(camelToKebab('camelCase')).toBe('camel-case');
		expect(camelToKebab('myVariableName')).toBe('my-variable-name');
		expect(camelToKebab('anotherExampleHere')).toBe('another-example-here');
	});

	it('must handle strings that are already in kebab-case', () => {
		expect(camelToKebab('already-kebab-case')).toBe('already-kebab-case');
	});

	it('must convert a single word correctly', () => {
		expect(camelToKebab('word')).toBe('word');
	});

	it('must convert a string with mixed cases correctly', () => {
		expect(camelToKebab('ThisIsAStringWithMixedCase')).toBe('this-is-a-string-with-mixed-case');
	});

	it('must return an empty string when given an empty string', () => {
		expect(camelToKebab('')).toBe('');
	});

	it('must handle edge cases with numbers and special characters', () => {
		expect(camelToKebab('camel123Test')).toBe('camel123-test');
		expect(camelToKebab('test_with_special$characters')).toBe('test_with_special$characters');
	});
});
