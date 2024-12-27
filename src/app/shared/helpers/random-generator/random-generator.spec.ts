import { RandomGenerator } from "src/app/shared/helpers/random-generator/random-generator";
import { timeToMinutes } from "src/app/shared/helpers/time-to-minutes/time-to-minutes";
import { BaseSelect } from "src/app/shared/models/base-select";
import { isDate } from "src/app/shared/helpers/is-date/is-date";
import { timeIsValid } from "src/app/shared/helpers/time-is-valid/time-is-valid";

describe(RandomGenerator.name, () => {
	describe('schema', () => {
		it('must return a random object following given schema', () => {
			interface Product {
				id: number;
				price: number;
				shortName: string;
				mediumName: string;
				longName: string;
				bio: string;
				shortDescription: string;
				mediumDescription: string;
				longDescription: string;
				createdAt: string;
				categories: BaseSelect[];
				createdHour: string;
				active: boolean;
				address: {
					cep: number;
					line1: string;
					houseNumber: number;
				},
				owner: string;
			}

			const result = RandomGenerator.schema<Product>({
				id: "id",
				price: "numeric",
				shortName: "word:short",
				mediumName: "word:medium",
				longName: "word:long",
				bio: "phrase",
				shortDescription: "text:short",
				mediumDescription: "text:medium",
				longDescription: "text:long",
				createdAt: "date",
				categories: "baseSelects",
				createdHour: "hour",
				active: "trueFalse",
				address: {
					cep: "numeric",
					line1: "word:long",
					houseNumber: "numeric",
				},
				owner: () => "Some people",
			});

			expect(result.id).toBeGreaterThanOrEqual(1000);
			expect(result.id).toBeLessThanOrEqual(9999);
			expect(result.price).toBeGreaterThanOrEqual(0);
			expect(result.shortName.length).toBe(6);
			expect(result.mediumName.length).toBe(9);
			expect(result.longName.length).toBe(12);
			expect(result.bio.split(" ").length).toBe(7);
			expect(result.shortDescription.split("\n\n").length).toBe(2);
			expect(result.mediumDescription.split("\n\n").length).toBe(4);
			expect(result.longDescription.split("\n\n").length).toBe(7);
			expect(isDate(result.createdAt)).toBe(true);

			expect(result.categories.length).toBe(5);

			result.categories.forEach((category) => {
				expect(category.id).toBeGreaterThanOrEqual(1000);
				expect(category.id).toBeLessThanOrEqual(9999);

				expect(category.name.length).toBe(6);
			});

			expect(timeIsValid(result.createdHour)).toBe(true);
			expect(typeof (result.active as unknown) === "boolean").toBe(true);

			expect(result.address.cep).toBeGreaterThanOrEqual(0);
			expect(result.address.line1.length).toBe(12);
			expect(result.address.houseNumber).toBeGreaterThanOrEqual(0);
		});
	});

	describe('array', () => {
		it('must return a list with given length containing random object following given schema', () => {
			interface Product {
				id: number;
				price: number;
				shortName: string;
				mediumName: string;
				longName: string;
				bio: string;
				shortDescription: string;
				mediumDescription: string;
				longDescription: string;
				createdAt: string;
				categories: BaseSelect[];
				createdHour: string;
				active: boolean;
				address: {
					cep: number;
					line1: string;
					houseNumber: number;
				},
				owner: string;
			}

			const results = RandomGenerator.array<Product>({
				id: "id",
				price: "numeric",
				shortName: "word:short",
				mediumName: "word:medium",
				longName: "word:long",
				bio: "phrase",
				shortDescription: "text:short",
				mediumDescription: "text:medium",
				longDescription: "text:long",
				createdAt: "date",
				categories: "baseSelects",
				createdHour: "hour",
				active: "trueFalse",
				address: {
					cep: "numeric",
					line1: "word:long",
					houseNumber: "numeric",
				},
				owner: () => "Some people",
			}, 12);

			expect(results.length).toBe(12);

			results.forEach(result => {
				expect(result.id).toBeGreaterThanOrEqual(1000);
				expect(result.id).toBeLessThanOrEqual(9999);
				expect(result.price).toBeGreaterThanOrEqual(0);
				expect(result.shortName.length).toBe(6);
				expect(result.mediumName.length).toBe(9);
				expect(result.longName.length).toBe(12);
				expect(result.bio.split(" ").length).toBe(7);
				expect(result.shortDescription.split("\n\n").length).toBe(2);
				expect(result.mediumDescription.split("\n\n").length).toBe(4);
				expect(result.longDescription.split("\n\n").length).toBe(7);
				expect(isDate(result.createdAt)).toBe(true);

				expect(result.categories.length).toBe(5);

				result.categories.forEach((category) => {
					expect(category.id).toBeGreaterThanOrEqual(1000);
					expect(category.id).toBeLessThanOrEqual(9999);

					expect(category.name.length).toBe(6);
				});

				expect(timeIsValid(result.createdHour)).toBe(true);
				expect(typeof (result.active as unknown) === "boolean").toBe(true);

				expect(result.address.cep).toBeGreaterThanOrEqual(0);
				expect(result.address.line1.length).toBe(12);
				expect(result.address.houseNumber).toBeGreaterThanOrEqual(0);
			});
		});

		it('must return a list with given length containing function result when a function is passed as schema', () => {
			const results = RandomGenerator.array(() => "Some function value", 12);

			expect(results.length).toBe(12);
			results.forEach(result => expect(result).toBe("Some function value"));
		});
	});

	describe('date', () => {
		it('must return a date between two specified dates', () => {
			const start = new Date('2020-01-01');
			const end = new Date('2024-12-31');
			const random = RandomGenerator.date(start, end);

			expect(random).toBeInstanceOf(Date);
			expect(random.getTime()).toBeGreaterThanOrEqual(start.getTime());
			expect(random.getTime()).toBeLessThanOrEqual(end.getTime());
		});

		it('must return a date greater than or equal to the start date when only start date is specified', () => {
			const start = new Date('2020-01-01');
			const random = RandomGenerator.date(start);

			expect(random).toBeInstanceOf(Date);
			expect(random.getTime()).toBeGreaterThanOrEqual(start.getTime());
		});

		it('must return a date less than or equal to the end date when only end date is specified', () => {
			const end = new Date('2024-12-31');
			const random = RandomGenerator.date(undefined, end);

			expect(random).toBeInstanceOf(Date);
			expect(random.getTime()).toBeLessThanOrEqual(end.getTime());
		});

		it('must return a random date when no dates are specified', () => {
			const random = RandomGenerator.date();

			expect(random).toBeInstanceOf(Date);
			expect(random.getTime()).toBeGreaterThanOrEqual(new Date(0).getTime());
		});

		it('must throw an error if the start date is after the end date', () => {
			const start = new Date('2024-12-31');
			const end = new Date('2020-01-01');

			expect(() => RandomGenerator.date(start, end)).toThrow('A data inicial não pode ser posterior à data final');
		});
	});

	describe('integer', () => {
		describe('When only min is specified', () => {
			it('must return any number greater than the specified and be integer', () => {
				let result = RandomGenerator.integer(45.12);
				expect(result).toBeGreaterThanOrEqual(46);
				expect(result).toBe(Math.floor(result));

				result = RandomGenerator.integer(123.435);
				expect(result).toBeGreaterThanOrEqual(124);
				expect(result).toBe(Math.floor(result));

				result = RandomGenerator.integer(11.456);
				expect(result).toBeGreaterThanOrEqual(12);
				expect(result).toBe(Math.floor(result));

				result = RandomGenerator.integer(33.54);
				expect(result).toBeGreaterThanOrEqual(34);
				expect(result).toBe(Math.floor(result));
			});
		});

		describe('When only max is specified', () => {
			it('must return any number greater than the specified and be integer', () => {
				let result = RandomGenerator.integer(undefined, 45.12);
				expect(result).toBeLessThanOrEqual(45);
				expect(result).toBe(Math.floor(result));

				result = RandomGenerator.integer(undefined, 123.435);
				expect(result).toBeLessThanOrEqual(123);
				expect(result).toBe(Math.floor(result));

				result = RandomGenerator.integer(undefined, 11.456);
				expect(result).toBeLessThanOrEqual(11);
				expect(result).toBe(Math.floor(result));

				result = RandomGenerator.integer(undefined, 33.54);
				expect(result).toBeLessThanOrEqual(33);
				expect(result).toBe(Math.floor(result));
			});
		});

		describe('When both specified', () => {
			it('must return any number between the two values and be integer', () => {
				let result = RandomGenerator.integer(12.213, 15.123);
				expect(result).toBeGreaterThanOrEqual(13);
				expect(result).toBeLessThanOrEqual(15);
				expect(result).toBe(Math.floor(result));

				result = RandomGenerator.integer(3423, 3450);
				expect(result).toBeGreaterThanOrEqual(3423);
				expect(result).toBeLessThanOrEqual(3450);
				expect(result).toBe(Math.floor(result));

				result = RandomGenerator.integer(0.23, 15.11);
				expect(result).toBeGreaterThanOrEqual(1);
				expect(result).toBeLessThanOrEqual(15);
				expect(result).toBe(Math.floor(result));

				result = RandomGenerator.integer(15.1231, 33);
				expect(result).toBeGreaterThanOrEqual(16);
				expect(result).toBeLessThanOrEqual(33);
				expect(result).toBe(Math.floor(result));
			});
		});
	});

	describe('float', () => {
		describe('When only min is specified', () => {
			it('must return any number greater than the specified', () => {
				let result = RandomGenerator.float(45.12);
				expect(result).toBeGreaterThanOrEqual(45.12);

				result = RandomGenerator.float(123.435);
				expect(result).toBeGreaterThanOrEqual(123.435);

				result = RandomGenerator.float(11.456);
				expect(result).toBeGreaterThanOrEqual(11.456);

				result = RandomGenerator.float(33.54);
				expect(result).toBeGreaterThanOrEqual(33.54);
			});
		});

		describe('When only max is specified', () => {
			it('must return any number greater than the specified', () => {
				let result = RandomGenerator.float(undefined, 45.12);
				expect(result).toBeLessThanOrEqual(45.12);

				result = RandomGenerator.float(undefined, 123.435);
				expect(result).toBeLessThanOrEqual(123.435);

				result = RandomGenerator.float(undefined, 11.456);
				expect(result).toBeLessThanOrEqual(11.456);

				result = RandomGenerator.float(undefined, 33.54);
				expect(result).toBeLessThanOrEqual(33.54);
			});
		});

		describe('When both specified', () => {
			it('must return any number between the two values', () => {
				let result = RandomGenerator.float(12.213, 15.123);
				expect(result).toBeGreaterThanOrEqual(12.213);
				expect(result).toBeLessThanOrEqual(15.123);

				result = RandomGenerator.float(3423, 3450);
				expect(result).toBeGreaterThanOrEqual(3423);
				expect(result).toBeLessThanOrEqual(3450);

				result = RandomGenerator.float(0.23, 15.11);
				expect(result).toBeGreaterThanOrEqual(0.23);
				expect(result).toBeLessThanOrEqual(15.11);

				result = RandomGenerator.float(15.1231, 33);
				expect(result).toBeGreaterThanOrEqual(15.1231);
				expect(result).toBeLessThanOrEqual(33);
			});
		});
	});

	describe('enumKeys', () => {
		it('must return all enum keys', () => {
			enum EnumTest {
				A = 1,
				B = "12",
				C = "Teste",
				D = 15,
			}

			const result = RandomGenerator.enumKeys(EnumTest);

			expect(result).toEqual([
				"A",
				"B",
				"C",
				"D",
			]);
		});
	});

	describe('enumValues', () => {
		it('must return all enum values', () => {
			enum EnumTest {
				A = 1,
				B = "12",
				C = "Teste",
				D = 15,
			}

			const result = RandomGenerator.enumValues(EnumTest);

			expect(result).toEqual([
				1,
				"12",
				"Teste",
				15
			]);
		});
	});

	describe('statusValues', () => {
		it('must return enum values as objects with id and name excluding entries which value is not a parseable number', () => {
			enum EnumTest {
				A = 1,
				B = "12",
				C = "Teste",
				D = 15,
			}

			const result = RandomGenerator.statusValues(EnumTest);

			expect(result).toEqual([
				{id: 1, name: "A"},
				{id: 12, name: "B"},
				{id: 15, name: "D"},
			]);
		});
	});

	describe('status', () => {
		it('must return any enum value as an object with id and name', () => {
			enum EnumTest {
				A = 1,
				B = "12",
				C = "Teste",
				D = 15,
			}

			const result = RandomGenerator.status(EnumTest);

			const allowedResults = [
				{id: 1, name: "A"},
				{id: 12, name: "B"},
				{id: 15, name: "D"},
			];

			const isAnyOfTheAllowedResults = allowedResults.some(allowedResult =>
				result.id===allowedResult.id
				&& result.name===allowedResult.name
			)

			expect(isAnyOfTheAllowedResults).toBe(true);
		});
	});

	describe('enumeration', () => {
		it('must return any enum value', () => {
			enum EnumTest {
				A = 1,
				B = "12",
				C = "Teste",
				D = 15,
			}

			const result = RandomGenerator.enumeration(EnumTest);

			const allowedResults = [
				1,
				"12",
				"Teste",
				15
			];

			const isAnyOfTheAllowedResults = allowedResults.some(allowedResult => result === allowedResult)

			expect(isAnyOfTheAllowedResults).toBe(true);
		});
	});

	describe('trueFalse', () => {
		it('must return a boolean', () => {
			expect(typeof RandomGenerator.trueFalse() === "boolean").toBe(true);
		});
	});

	describe('word', () => {
		it('must return a random string with the specified length', () => {
			expect(RandomGenerator.word(0).length).toBe(0);
			expect(RandomGenerator.word(12).length).toBe(12);
			expect(RandomGenerator.word(345).length).toBe(345);
			expect(RandomGenerator.word(42).length).toBe(42);
			expect(RandomGenerator.word(44).length).toBe(44);
			expect(RandomGenerator.word(67).length).toBe(67);
		});
	});

	describe('phrase', () => {
		it('must return a text with specified number of words separated by " "', () => {
			let phrase = RandomGenerator.phrase(13);
			let words = phrase.split(' ');

			expect(words.length).toBe(13);

			phrase = RandomGenerator.phrase(2);
			words = phrase.split(' ');

			expect(words.length).toBe(2);

			phrase = RandomGenerator.phrase(1);
			words = phrase.split(' ');

			expect(words.length).toBe(1);
		});

		it('each word length must be between 7 and 10', () => {
			let phrase = RandomGenerator.phrase(13);
			let words = phrase.split(' ');

			words.forEach((word) => {
				expect(word.length).toBeGreaterThanOrEqual(7);
				expect(word.length).toBeLessThanOrEqual(10);
			});

			phrase = RandomGenerator.phrase(2);
			words = phrase.split(' ');

			words.forEach((word) => {
				expect(word.length).toBeGreaterThanOrEqual(7);
				expect(word.length).toBeLessThanOrEqual(10);
			});

			phrase = RandomGenerator.phrase(1);
			words = phrase.split(' ');

			words.forEach((word) => {
				expect(word.length).toBeGreaterThanOrEqual(7);
				expect(word.length).toBeLessThanOrEqual(10);
			});
		});
	});

	describe('paragraphs', () => {
		it('must return a text with specified number of phrases separated by \n\n', () => {
			let paragraph = RandomGenerator.paragraphs(12);
			let phrases = paragraph.split('\n\n');

			expect(phrases.length).toBe(12);

			paragraph = RandomGenerator.paragraphs(5);
			phrases = paragraph.split('\n\n');

			expect(phrases.length).toBe(5);

			paragraph = RandomGenerator.paragraphs(1);
			phrases = paragraph.split('\n\n');

			expect(phrases.length).toBe(1);
		});

		it('each paragraph must has between 8 and 16 words', () => {
			let paragraph = RandomGenerator.paragraphs(12);
			let phrases = paragraph.split('\n\n');

			phrases.forEach((phrase) => {
				const words = phrase.split(' ');

				expect(words.length).toBeGreaterThanOrEqual(8);
				expect(words.length).toBeLessThanOrEqual(16);
			});
		});

		it('each word length must be between 7 and 10', () => {
			const paragraph = RandomGenerator.paragraphs(1);
			const phrase = paragraph.split('\n\n')[0];
			const words = phrase.split(' ');

			words.forEach((word) => {
				expect(word.length).toBeGreaterThanOrEqual(7);
				expect(word.length).toBeLessThanOrEqual(10);
			});
		});
	});

	describe('randomHour', () => {
		it('must return a valid time between minHours and maxHours', () => {
			const minHours = '08:00';
			const maxHours = '18:00';

			const result = RandomGenerator.randomHour(minHours, maxHours);

			expect(result).toMatch(/^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])$/);

			expect(timeToMinutes(result)).toBeGreaterThanOrEqual(timeToMinutes(minHours));
			expect(timeToMinutes(result)).toBeLessThanOrEqual(timeToMinutes(maxHours));
		});

		it('must return a valid time between minHours and maxHours when both are equal', () => {
			const minHours = '08:00';
			const maxHours = '08:59';

			const result = RandomGenerator.randomHour(minHours, maxHours);

			expect(result).toMatch(/^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])$/);

			expect(timeToMinutes(result)).toBeGreaterThanOrEqual(timeToMinutes(minHours));
			expect(timeToMinutes(result)).toBeLessThanOrEqual(timeToMinutes(maxHours));
		});

		it('must return a valid time between 00:00 and 23:59 when both are not defined', () => {
			const minHours = '00:00';
			const maxHours = '23:59';

			const result = RandomGenerator.randomHour();

			expect(result).toMatch(/^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])$/);

			expect(timeToMinutes(result)).toBeGreaterThanOrEqual(timeToMinutes(minHours));
			expect(timeToMinutes(result)).toBeLessThanOrEqual(timeToMinutes(maxHours));
		});

		it('must throw an error for invalid minHours', () => {
			const invalidMinHours = '25:00';
			const validMaxHours = '23:59';

			expect(() => RandomGenerator.randomHour(invalidMinHours, validMaxHours)).toThrow(`Min hour ${invalidMinHours} is invalid`);
		});

		it('must throw an error for invalid maxHours', () => {
			const validMinHours = '00:00';
			const invalidMaxHours = '24:00';

			expect(() => RandomGenerator.randomHour(validMinHours, invalidMaxHours)).toThrow(`Max hour ${invalidMaxHours} is invalid`);
		});

		it('must throw an error for invalid minutes in minHours', () => {
			const invalidMinHours = '08:60';
			const validMaxHours = '23:59';

			expect(() => RandomGenerator.randomHour(invalidMinHours, validMaxHours)).toThrow(`Min hour ${invalidMinHours} is invalid`);
		});

		it('must throw an error for invalid minutes in maxHours', () => {
			const validMinHours = '00:00';
			const invalidMaxHours = '23:60';

			expect(() => RandomGenerator.randomHour(validMinHours, invalidMaxHours)).toThrow(`Max hour ${invalidMaxHours} is invalid`);
		});
	});


	describe('hourPeriod', () => {
		it('must return a valid time between minHours and maxHours', () => {
			const minHours = '08:00';
			const maxHours = '18:00';
			const {start, end} = RandomGenerator.hourPeriod(minHours, maxHours);

			expect(start).toMatch(/^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])$/);
			expect(end).toMatch(/^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])$/);

			expect(timeToMinutes(start)).toBeGreaterThanOrEqual(timeToMinutes(minHours));
			expect(timeToMinutes(start)).toBeLessThanOrEqual(timeToMinutes(maxHours));

			expect(timeToMinutes(end)).toBeGreaterThanOrEqual(timeToMinutes(start));
			expect(timeToMinutes(end)).toBeLessThanOrEqual(timeToMinutes(maxHours));
		});

		it('must return a valid time between minHours and maxHours when both are equal', () => {
			const minHours = '08:00';
			const maxHours = '08:59';

			const {start, end} = RandomGenerator.hourPeriod(minHours, maxHours);

			expect(start).toMatch(/^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])$/);
			expect(end).toMatch(/^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])$/);

			expect(timeToMinutes(start)).toBeGreaterThanOrEqual(timeToMinutes(minHours));
			expect(timeToMinutes(start)).toBeLessThanOrEqual(timeToMinutes(maxHours));

			expect(timeToMinutes(end)).toBeGreaterThanOrEqual(timeToMinutes(start));
			expect(timeToMinutes(end)).toBeLessThanOrEqual(timeToMinutes(maxHours));
		});

		it('must return a valid time between 00:00 and 23:59 when both are not defined', () => {
			const minHours = '00:00';
			const maxHours = '23:59';

			const {start, end} = RandomGenerator.hourPeriod();

			expect(start).toMatch(/^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])$/);
			expect(end).toMatch(/^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])$/);

			expect(timeToMinutes(start)).toBeGreaterThanOrEqual(timeToMinutes(minHours));
			expect(timeToMinutes(start)).toBeLessThanOrEqual(timeToMinutes(maxHours));

			expect(timeToMinutes(end)).toBeGreaterThanOrEqual(timeToMinutes(start));
			expect(timeToMinutes(end)).toBeLessThanOrEqual(timeToMinutes(maxHours));
		});

		it('must throw an error for invalid minHours', () => {
			const invalidMinHours = '25:00';
			const validMaxHours = '23:59';

			expect(() => RandomGenerator.hourPeriod(invalidMinHours, validMaxHours)).toThrow(`Min hour ${invalidMinHours} is invalid`);
		});

		it('must throw an error for invalid maxHours', () => {
			const validMinHours = '00:00';
			const invalidMaxHours = '24:00';

			expect(() => RandomGenerator.hourPeriod(validMinHours, invalidMaxHours)).toThrow(`Max hour ${invalidMaxHours} is invalid`);
		});

		it('must throw an error for invalid minutes in minHours', () => {
			const invalidMinHours = '08:60';
			const validMaxHours = '23:59';

			expect(() => RandomGenerator.hourPeriod(invalidMinHours, validMaxHours)).toThrow(`Min hour ${invalidMinHours} is invalid`);
		});

		it('must throw an error for invalid minutes in maxHours', () => {
			const validMinHours = '00:00';
			const invalidMaxHours = '23:60';

			expect(() => RandomGenerator.hourPeriod(validMinHours, invalidMaxHours)).toThrow(`Max hour ${invalidMaxHours} is invalid`);
		});
	});

	describe('anyOfThese', () => {
		it('must return one of the available options passed', () => {
			const possibilities = [
				0,
				23,
				"Teste",
				new Date(),
				true,
				false
			];

			const result = RandomGenerator.anyOfThese(...possibilities);

			const isOneOfAllowed = possibilities.some((option) => {
				if(option instanceof Date && result instanceof Date)
					return option.getTime() === result.getTime();

				return option === result;
			});

			expect(isOneOfAllowed).toBe(true);
		});
	});

	describe('allEnumsButThese', () => {
		it('must return any enum value except given', () => {
			enum EnumTest {
				A = 1,
				B = "12",
				C = "Teste",
				D = 15,
			}

			const result = RandomGenerator.allEnumsButThese(EnumTest, [
				EnumTest.C,
				EnumTest.D,
			]);

			const allowedResults = [
				1,
				"12",
			];

			const isAnyOfTheAllowedResults = allowedResults.some(allowedResult => result === allowedResult)

			expect(isAnyOfTheAllowedResults).toBe(true);
		});
	});
});
