import { createArray } from "src/app/shared/helpers/create-array/create-array";

describe(createArray.name, () => {
	describe('When no start value is passed', () => {
		it('must create an array with values starting at zero', () => {
			expect(createArray(12)).toEqual([
				0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
			]);
		});
	});

	describe('When start value is passed', () => {
		it('must create an array with values starting at zero', () => {
			expect(createArray(12, 31)).toEqual([
				31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42
			]);
		});
	});
});
