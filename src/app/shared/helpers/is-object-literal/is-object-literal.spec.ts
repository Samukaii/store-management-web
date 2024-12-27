import { isObjectLiteral } from "src/app/shared/helpers/is-object-literal/is-object-literal";
describe(isObjectLiteral.name, () => {
	describe('Valid object literals', () => {
		it('must return true for a plain object', () => {
			const plainObject = { key: 'value' };
			expect(isObjectLiteral(plainObject)).toBeTrue();
		});

		it('must return true for an empty object', () => {
			const emptyObject = {};
			expect(isObjectLiteral(emptyObject)).toBeTrue();
		});

		it('must return true for an object with nested properties', () => {
			const nestedObject = { key: { nestedKey: 'value' } };
			expect(isObjectLiteral(nestedObject)).toBeTrue();
		});
	});

	describe('Invalid values', () => {
		it('must return false for null', () => {
			expect(isObjectLiteral(null)).toBeFalse();
		});

		it('must return false for an array', () => {
			const arrayValue = [1, 2, 3];
			expect(isObjectLiteral(arrayValue)).toBeFalse();
		});

		it('must return false for a function', () => {
			const func = () => {};
			expect(isObjectLiteral(func)).toBeFalse();
		});

		it('must return false for a class instance', () => {
			class MyClass {}
			const classInstance = new MyClass();
			expect(isObjectLiteral(classInstance)).toBeFalse();
		});

		it('must return false for a Map', () => {
			const map = new Map();
			expect(isObjectLiteral(map)).toBeFalse();
		});

		it('must return false for a Set', () => {
			const set = new Set();
			expect(isObjectLiteral(set)).toBeFalse();
		});

		it('must return false for a primitive value (string)', () => {
			expect(isObjectLiteral('string')).toBeFalse();
		});

		it('must return false for a primitive value (number)', () => {
			expect(isObjectLiteral(123)).toBeFalse();
		});

		it('must return false for a primitive value (boolean)', () => {
			expect(isObjectLiteral(true)).toBeFalse();
		});

		it('must return false for undefined', () => {
			expect(isObjectLiteral(undefined)).toBeFalse();
		});
	});

	describe('Edge cases', () => {
		it('must return false for an object created with a custom prototype', () => {
			const customPrototypeObject = Object.create({ custom: true });
			expect(isObjectLiteral(customPrototypeObject)).toBeFalse();
		});

		it('must return false for an object created with `null` prototype', () => {
			const nullPrototypeObject = Object.create(null);
			expect(isObjectLiteral(nullPrototypeObject)).toBeFalse();
		});

		it('must return true for an object explicitly set with Object.prototype', () => {
			const objectWithDefaultPrototype = Object.assign(
				Object.create(Object.prototype),
				{ key: 'value' }
			);
			expect(isObjectLiteral(objectWithDefaultPrototype)).toBeTrue();
		});
	});
});
