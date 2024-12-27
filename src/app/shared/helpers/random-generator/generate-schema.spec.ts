import { generateSchema } from "src/app/shared/helpers/random-generator/generate-schema";
import { RandomGenerator } from "src/app/shared/helpers/random-generator/random-generator";
import { BaseSelect } from "src/app/shared/models/base-select";

const mockGenerator = () => {
	const generator = {
		integer: jest.fn(),
		word: jest.fn(),
		array: jest.fn(),
		phrase: jest.fn(),
		paragraphs: jest.fn(),
		randomHour: jest.fn(),
		date: jest.fn(),
		trueFalse: jest.fn(),
	}

	return {
		...generator,
		parsed: () => generator as any as typeof RandomGenerator,
	}
}

describe(generateSchema.name, () => {
	it('must generate id schema', () => {
		const generator = mockGenerator();

		generator.integer.mockReturnValue(1234);

		const result = generateSchema('id', generator.parsed());

		expect(result).toBe(1234);
		expect(generator.integer).toHaveBeenCalledExactlyOnceWith(1000, 9999);
	});

	it('must generate numeric schema', () => {
		const generator = mockGenerator();

		generator.integer.mockReturnValue(1234);

		const result = generateSchema('numeric', generator.parsed());

		expect(result).toBe(1234);
		expect(generator.integer).toHaveBeenCalledExactlyOnceWith(0);
	});

	it('must generate word:short schema', () => {
		const generator = mockGenerator();

		generator.word.mockReturnValue('abcdef');

		const result = generateSchema('word:short', generator.parsed());

		expect(result).toBe('abcdef');
		expect(generator.word).toHaveBeenCalledExactlyOnceWith(6);
	});

	it('must generate word:medium schema', () => {
		const generator = mockGenerator();

		generator.word.mockReturnValue('abcdef');

		const result = generateSchema('word:medium', generator.parsed());

		expect(result).toBe('abcdef');
		expect(generator.word).toHaveBeenCalledExactlyOnceWith(9);
	});

	it('must generate word:long schema', () => {
		const generator = mockGenerator();

		generator.word.mockReturnValue('abcdef');

		const result = generateSchema('word:long', generator.parsed());

		expect(result).toBe('abcdef');
		expect(generator.word).toHaveBeenCalledExactlyOnceWith(12);
	});

	it('must generate phrase schema', () => {
		const generator = mockGenerator();

		generator.phrase.mockReturnValue('abcdef');

		const result = generateSchema('phrase', generator.parsed());

		expect(result).toBe('abcdef');
		expect(generator.phrase).toHaveBeenCalledExactlyOnceWith(7);
	});

	it('must generate text:short schema', () => {
		const generator = mockGenerator();

		generator.paragraphs.mockReturnValue('abcdef');

		const result = generateSchema('text:short', generator.parsed());

		expect(result).toBe('abcdef');
		expect(generator.paragraphs).toHaveBeenCalledExactlyOnceWith(2);
	});

	it('must generate text:medium schema', () => {
		const generator = mockGenerator();

		generator.paragraphs.mockReturnValue('abcdef');

		const result = generateSchema('text:medium', generator.parsed());

		expect(result).toBe('abcdef');
		expect(generator.paragraphs).toHaveBeenCalledExactlyOnceWith(4);
	});

	it('must generate text:long schema', () => {
		const generator = mockGenerator();

		generator.paragraphs.mockReturnValue('abcdef');

		const result = generateSchema('text:long', generator.parsed());

		expect(result).toBe('abcdef');
		expect(generator.paragraphs).toHaveBeenCalledExactlyOnceWith(7);
	});

	it('must generate date schema', () => {
		const generator = mockGenerator();

		const mockDate = new Date(2024, 0, 1).toString();
		generator.date.mockReturnValue(new Date(2024, 0, 1));

		const result = generateSchema('date', generator.parsed());

		expect(result).toBe(mockDate);
		expect(generator.date).toHaveBeenCalledExactlyOnceWith();
	});

	it('must generate baseSelects schema',
		() => {
			const generator = mockGenerator();

			const expectedResult: BaseSelect[] = [
				{id: 1, name: 'Item 1'},
				{id: 2, name: 'Item 2'},
				{id: 3, name: 'Item 3'},
				{id: 4, name: 'Item 4'},
				{id: 5, name: 'Item 5'}
			];

			generator.array.mockReturnValue(expectedResult);

			const result = generateSchema('baseSelects', generator.parsed());

			expect(result).toEqual(expectedResult);
			expect(generator.array).toHaveBeenCalledExactlyOnceWith({id: "id", name: "word:short"}, 5);
		});

	it('must generate hour schema', () => {
		const generator = mockGenerator();

		generator.randomHour.mockReturnValue(true);

		const result = generateSchema('hour', generator.parsed());

		expect(result).toBe(true);
		expect(generator.randomHour).toHaveBeenCalledExactlyOnceWith();
	});

	it('must generate trueFalse schema', () => {
		const generator = mockGenerator();

		generator.trueFalse.mockReturnValue(true);

		const result = generateSchema('trueFalse', generator.parsed());

		expect(result).toBe(true);
		expect(generator.trueFalse).toHaveBeenCalledExactlyOnceWith();
	});
});
