import { RandomGenerator } from "src/app/shared/helpers/random-generator/random-generator";

export const randomSchemaGenerators = {
	id: (random: typeof RandomGenerator) => random.integer(1000, 9999),
	numeric: (random: typeof RandomGenerator) => random.integer(0),
	"word:short": (random: typeof RandomGenerator) => random.word(6),
	"word:medium": (random: typeof RandomGenerator) => random.word(9),
	"word:long": (random: typeof RandomGenerator) => random.word(12),
	phrase: (random: typeof RandomGenerator) => random.phrase(7),
	"text:short": (random: typeof RandomGenerator) => random.paragraphs(2),
	"text:medium": (random: typeof RandomGenerator) => random.paragraphs(4),
	"text:long": (random: typeof RandomGenerator) => random.paragraphs(7),
	date: (random: typeof RandomGenerator) => random.date().toString(),
	baseSelects: (random: typeof RandomGenerator) => random.array({
		id: "id",
		name: "word:short"
	}, 5),
	hour: (random: typeof RandomGenerator) => random.randomHour(),
	trueFalse: (random: typeof RandomGenerator) => random.trueFalse(),
};
