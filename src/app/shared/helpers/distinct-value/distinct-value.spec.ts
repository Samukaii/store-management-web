import { distinctValue } from "src/app/shared/helpers/distinct-value/distinct-value";
import { Generic } from "src/app/shared/models/generic";

describe(distinctValue.name, () => {
	it('must return false when previous and current is of different types', () => {
		expect(distinctValue('', true)).toBe(false);
		expect(distinctValue(true, new Date())).toBe(false);
		expect(distinctValue(new Date(), 5)).toBe(false);
		expect(distinctValue(5, 'Teste')).toBe(false);
		expect(distinctValue(true, 'true')).toBe(false);
	});

	describe('When previous and current is dates', () => {
		it('must return false if is different', () => {
			const prev = new Date('2024-12-25T13:32:38.000Z');
			const curr = new Date('2024-12-23T13:32:38.000Z');

			expect(distinctValue(prev, curr)).toBe(false);
		});

		it('must return true if are same dates', () => {
			const prev = new Date('2024-12-25T13:32:38.000Z');
			const curr = new Date('2024-12-25T13:32:38.000Z');

			expect(distinctValue(prev, curr)).toBe(true);
		});
	});

	describe('When previous and current is array', () => {
		it('must return false if length is different', () => {
			const prev = [1, 2];
			const curr = [1, 2, 3];

			expect(distinctValue(prev, curr)).toBe(false);
		});

		it('must return false if length is equal but values is different', () => {
			let prev: unknown[] = [1, 2, 3];
			let curr: unknown[] = [1, 2, 4];

			expect(distinctValue(prev, curr)).toBe(false);

			prev = [1, new Date('2024-12-25T13:32:38.000Z'), 3];
			curr = [1, new Date('2024-12-23T13:32:38.000Z'), 3];

			expect(distinctValue(prev, curr)).toBe(false);

			prev = [1, 2, true];
			curr = [1, 2, false];

			expect(distinctValue(prev, curr)).toBe(false);

			prev = [1, 2, {abc: "123"}];
			curr = [1, 2, {abc: "1234"}];

			expect(distinctValue(prev, curr)).toBe(false);

			prev = [1, 2, [1, 2]];
			curr = [1, 2, [1, 3]];

			expect(distinctValue(prev, curr)).toBe(false);
		});

		it('must return true if length is equal and values are equal', () => {
			let prev: unknown[] = [1, 2, 3];
			let curr: unknown[] = [1, 2, 3];

			expect(distinctValue(prev, curr)).toBe(true);

			prev = [1, new Date('2024-12-25T13:32:38.000Z'), 3];
			curr = [1, new Date('2024-12-25T13:32:38.000Z'), 3];

			expect(distinctValue(prev, curr)).toBe(true);

			prev = [1, 2, false];
			curr = [1, 2, false];

			expect(distinctValue(prev, curr)).toBe(true);

			prev = [1, 2, {abc: "1234"}];
			curr = [1, 2, {abc: "1234"}];

			expect(distinctValue(prev, curr)).toBe(true);

			prev = [1, 2, [1, 2, 3, 4]];
			curr = [1, 2, [1, 2, 3, 4]];

			expect(distinctValue(prev, curr)).toBe(true);
		});
	});

	describe('When values are objects', () => {
		it('must return false if length is different', () => {
			const prev = {abc: "123", def: "456"};
			const curr = {abc: "123", def: "456", ghi: "789"};

			expect(distinctValue(prev, curr)).toBe(false);
		});

		it('must return false if length is equal but values are different', () => {
			let prev: Generic = {
				abc: 1,
				uda: 3,
				acs: 4
			};

			let curr: Generic = {
				abc: 1,
				asd: 3,
				acs: 4
			};

			expect(distinctValue(prev, curr)).toBe(false);

			prev = {
				abc: new Date('2024-12-25T13:32:38.000Z'),
				uda: 3,
				acs: 4
			};

			curr = {
				abc: new Date('2024-12-26T13:32:38.000Z'),
				uda: 3,
				acs: 4
			};

			expect(distinctValue(prev, curr)).toBe(false);

			prev = {
				abc: "some-value",
				uda: 3,
				acs: 4
			};

			curr = {
				abc: "some-other-value",
				uda: 3,
				acs: 4
			};

			expect(distinctValue(prev, curr)).toBe(false);

			prev = {
				abc: 1,
				uda: {
					a: "",
					b: true,
					c: false,
					d: {
						a: "some-value",
						b: new Date('2024-12-25T13:32:38.000Z'),
						c: [1, 2, 3]
					}
				},
				acs: 4
			};

			curr = {
				abc: 1,
				uda: {
					a: "",
					b: true,
					c: true,
					d: {
						a: "some-value",
						b: new Date('2024-12-25T13:32:38.000Z'),
						c: [1, 2, 3, 4]
					}
				},
				acs: 4
			};

			expect(distinctValue(prev, curr)).toBe(false);
		});

		it('must return true if length is equal and values are equal', () => {
			let prev: Generic = {
				abc: 1,
				uda: 3,
				acs: 4
			};

			let curr: Generic = {
				abc: 1,
				uda: 3,
				acs: 4
			};

			expect(distinctValue(prev, curr)).toBe(true);

			prev = {
				abc: new Date('2024-12-26T13:32:38.000Z'),
				uda: 3,
				acs: 4
			};

			curr = {
				abc: new Date('2024-12-26T13:32:38.000Z'),
				uda: 3,
				acs: 4
			};

			expect(distinctValue(prev, curr)).toBe(true);

			prev = {
				abc: "some-value",
				uda: 3,
				acs: 4
			};

			curr = {
				abc: "some-value",
				uda: 3,
				acs: 4
			};

			expect(distinctValue(prev, curr)).toBe(true);

			prev = {
				abc: 1,
				uda: {
					a: "",
					b: true,
					c: true,
					d: {
						a: "some-value",
						b: new Date('2024-12-25T13:32:38.000Z'),
						c: [1, 2, 3, 4]
					}
				},
				acs: 4
			};

			curr = {
				abc: 1,
				uda: {
					a: "",
					b: true,
					c: true,
					d: {
						a: "some-value",
						b: new Date('2024-12-25T13:32:38.000Z'),
						c: [1, 2, 3, 4]
					}
				},
				acs: 4
			};

			expect(distinctValue(prev, curr)).toBe(true);
		});
	});

	describe('When values are string, booleans, null or undefined', () => {
		it('must return false if values are different', () => {
			expect(distinctValue("some-text", "some-other-text")).toBe(false);
			expect(distinctValue(true, false)).toBe(false);
			expect(distinctValue(5, 12)).toBe(false);
			expect(distinctValue(null, undefined)).toBe(false);
			expect(distinctValue(undefined, null)).toBe(false);
		});

		it('must return true if values are equal', () => {
			expect(distinctValue("some-text", "some-text")).toBe(true);
			expect(distinctValue(true, true)).toBe(true);
			expect(distinctValue(12, 12)).toBe(true);
			expect(distinctValue(null, null)).toBe(true);
			expect(distinctValue(undefined, undefined)).toBe(true);
		});
	});
});
