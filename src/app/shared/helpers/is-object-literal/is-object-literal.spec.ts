import { isObjectLiteral } from "src/app/shared/helpers/is-object-literal/is-object-literal";
describe(isObjectLiteral.name, () => {
	describe('Valid object literals', () => {
		it('should return true for a plain object', () => {
			const plainObject = { key: 'value' };
			expect(isObjectLiteral(plainObject)).toBeTrue();
		});

		it('should return true for an empty object', () => {
			const emptyObject = {};
			expect(isObjectLiteral(emptyObject)).toBeTrue();
		});

		it('should return true for an object with nested properties', () => {
			const nestedObject = { key: { nestedKey: 'value' } };
			expect(isObjectLiteral(nestedObject)).toBeTrue();
		});
	});

	describe('Invalid values', () => {
		it('should return false for null', () => {
			expect(isObjectLiteral(null)).toBeFalse();
		});

		it('should return false for an array', () => {
			const arrayValue = [1, 2, 3];
			expect(isObjectLiteral(arrayValue)).toBeFalse();
		});

		it('should return false for a function', () => {
			const func = () => {};
			expect(isObjectLiteral(func)).toBeFalse();
		});

		it('should return false for a class instance', () => {
			class MyClass {}
			const classInstance = new MyClass();
			expect(isObjectLiteral(classInstance)).toBeFalse();
		});

		it('should return false for a Map', () => {
			const map = new Map();
			expect(isObjectLiteral(map)).toBeFalse();
		});

		it('should return false for a Set', () => {
			const set = new Set();
			expect(isObjectLiteral(set)).toBeFalse();
		});

		it('should return false for a primitive value (string)', () => {
			expect(isObjectLiteral('string')).toBeFalse();
		});

		it('should return false for a primitive value (number)', () => {
			expect(isObjectLiteral(123)).toBeFalse();
		});

		it('should return false for a primitive value (boolean)', () => {
			expect(isObjectLiteral(true)).toBeFalse();
		});

		it('should return false for undefined', () => {
			expect(isObjectLiteral(undefined)).toBeFalse();
		});
	});

	describe('Edge cases', () => {
		it('should return false for an object created with a custom prototype', () => {
			const customPrototypeObject = Object.create({ custom: true });
			expect(isObjectLiteral(customPrototypeObject)).toBeFalse();
		});

		it('should return false for an object created with `null` prototype', () => {
			const nullPrototypeObject = Object.create(null);
			expect(isObjectLiteral(nullPrototypeObject)).toBeFalse();
		});

		it('should return true for an object explicitly set with Object.prototype', () => {
			const objectWithDefaultPrototype = Object.assign(
				Object.create(Object.prototype),
				{ key: 'value' }
			);
			expect(isObjectLiteral(objectWithDefaultPrototype)).toBeTrue();
		});
	});
});
