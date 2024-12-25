import { isSchema } from "src/app/shared/helpers/random-schema-generators/is-schema";

describe(isSchema.name, () => {
	describe('Valid schema', () => {
		it('should return true for a plain object', () => {
			const plainObject = { key: 'value' };
			expect(isSchema(plainObject)).toBeTrue();
		});

		it('should return true for an empty object', () => {
			const emptyObject = {};
			expect(isSchema(emptyObject)).toBeTrue();
		});

		it('should return true for an object with nested properties', () => {
			const nestedObject = { key: { nestedKey: 'value' } };
			expect(isSchema(nestedObject)).toBeTrue();
		});
	});

	describe('Invalid values', () => {
		it('should return false for null', () => {
			expect(isSchema(null)).toBeFalse();
		});

		it('should return false for an array', () => {
			const arrayValue = [1, 2, 3];
			expect(isSchema(arrayValue)).toBeFalse();
		});

		it('should return false for a function', () => {
			const func = () => {};
			expect(isSchema(func)).toBeFalse();
		});

		it('should return false for a class instance', () => {
			class MyClass {}
			const classInstance = new MyClass();
			expect(isSchema(classInstance)).toBeFalse();
		});

		it('should return false for a Map', () => {
			const map = new Map();
			expect(isSchema(map)).toBeFalse();
		});

		it('should return false for a Set', () => {
			const set = new Set();
			expect(isSchema(set)).toBeFalse();
		});

		it('should return false for a primitive value (string)', () => {
			expect(isSchema('string')).toBeFalse();
		});

		it('should return false for a primitive value (number)', () => {
			expect(isSchema(123)).toBeFalse();
		});

		it('should return false for a primitive value (boolean)', () => {
			expect(isSchema(true)).toBeFalse();
		});

		it('should return false for undefined', () => {
			expect(isSchema(undefined)).toBeFalse();
		});
	});

	describe('Edge cases', () => {
		it('should return false for an object created with a custom prototype', () => {
			const customPrototypeObject = Object.create({ custom: true });
			expect(isSchema(customPrototypeObject)).toBeFalse();
		});

		it('should return false for an object created with `null` prototype', () => {
			const nullPrototypeObject = Object.create(null);
			expect(isSchema(nullPrototypeObject)).toBeFalse();
		});

		it('should return true for an object explicitly set with Object.prototype', () => {
			const objectWithDefaultPrototype = Object.assign(
				Object.create(Object.prototype),
				{ key: 'value' }
			);
			expect(isSchema(objectWithDefaultPrototype)).toBeTrue();
		});
	});
});
