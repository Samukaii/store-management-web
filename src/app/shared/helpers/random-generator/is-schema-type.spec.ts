import { isSchemaType } from "src/app/shared/helpers/random-generator/is-schema-type";
import { RandomSchemaType } from "src/app/shared/models/random-schema-type";

describe(isSchemaType.name, () => {
	const validCases: RandomSchemaType[] = [
		"id",
		"numeric",
		"word:medium",
		"word:long",
		"word:short",
		"phrase",
		"text:short",
		"text:medium",
		"text:long",
		"date",
		"baseSelects",
		"hour",
		"trueFalse",
	];

	const invalidCases = [
		"random-string",
		"other-string",
		"",
		{},
		true,
		false,
		0,
		123,
		new Date()
	];

	validCases.forEach(validCase => {
		it(`must return true when receives "${validCase}"`, () => {
			expect(isSchemaType(validCase)).toBe(true);
		});
	});

	it(`must return false when receives invalid value`, () => {
		invalidCases.forEach(invalidCase => {
			expect(isSchemaType(invalidCase)).toBe(false);
		})
	});
});
