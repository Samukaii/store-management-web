import { distinctPropertiesAvoidingNull } from "src/app/shared/helpers/distinct-properties-avoiding-null/distinct-properties-avoiding-null";
import { Generic } from "src/app/shared/models/generic";

describe(distinctPropertiesAvoidingNull.name, () => {
	it('must return false if any property value differs', () => {
		const properties = ['abc', 'def'] as (keyof Generic)[];
		const distinct = distinctPropertiesAvoidingNull(properties);

		const prev = { abc: 1, def: 'value1' } as Generic;
		const curr = { abc: 2, def: 'value1' } as Generic;

		expect(distinct(prev, curr)).toBe(false);

		const prev2 = { abc: 1, def: 'value1' } as Generic;
		const curr2 = { abc: 1, def: 'value2' } as Generic;

		expect(distinct(prev2, curr2)).toBe(false);
	});

	it('must return true if all specified properties are equal', () => {
		const properties = ['abc', 'def'] as (keyof Generic)[];
		const distinct = distinctPropertiesAvoidingNull(properties);

		const prev = { abc: 1, def: 'value1' } as Generic;
		const curr = { abc: 1, def: 'value1' } as Generic;

		expect(distinct(prev, curr)).toBe(true);
	});

	it('must ignore when currentValue is null', () => {
		const properties = ['abc', 'def', 'ghi'] as (keyof Generic)[];
		const distinct = distinctPropertiesAvoidingNull(properties);

		const prev = { abc: 1, def: 'value1', ghi: 'some-value' } as Generic;
		const curr = { abc: 1, def: 'value1', ghi: null } as Generic;

		expect(distinct(prev, curr)).toBe(true);
	});

	it('must ignore properties not listed in the array', () => {
		const properties = ['abc'] as (keyof Generic)[];
		const distinct = distinctPropertiesAvoidingNull(properties);

		const prev = { abc: 1, def: 'value1' } as Generic;
		const curr = { abc: 1, def: 'value2' } as Generic;

		expect(distinct(prev, curr)).toBe(true);
	});

	it('must return false if null or undefined properties are in different states', () => {
		const properties = ['abc', 'def'] as (keyof Generic)[];
		const distinct = distinctPropertiesAvoidingNull(properties);

		const prev = { abc: null, def: 'value1' } as Generic;
		const curr = { abc: 1, def: 'value1' } as Generic;

		expect(distinct(prev, curr)).toBe(false);

		const prev2 = { abc: 1, def: undefined } as Generic;
		const curr2 = { abc: 1, def: 'value1' } as Generic;

		expect(distinct(prev2, curr2)).toBe(false);
	});

	it('must return true for empty property arrays', () => {
		const properties: (keyof Generic)[] = [];
		const distinct = distinctPropertiesAvoidingNull(properties);

		const prev = { abc: 1, def: 'value1' } as Generic;
		const curr = { abc: 2, def: 'value2' } as Generic;

		expect(distinct(prev, curr)).toBe(true);
	});
});
