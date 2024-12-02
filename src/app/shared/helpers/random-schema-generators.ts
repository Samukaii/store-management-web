import { RandomGenerator } from "./random-generator";
import { RandomSchemaType } from "../models/random-schema-type";
import { RandomSchema } from "../models/random-schema";

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
		name: "shortText"
	}, 5),
	hour: (random: typeof RandomGenerator) => random.randomHour(),
	trueFalse: (random: typeof RandomGenerator) => random.trueFalse(),
};


export const generateSchema = (type: RandomSchemaType, generator: typeof RandomGenerator) => randomSchemaGenerators[type](generator);

export const isSchemaType = (value: unknown): value is RandomSchemaType =>
	!!randomSchemaGenerators[value as RandomSchemaType];
export const isSchema = (value: unknown): value is RandomSchema => typeof value === "object";
