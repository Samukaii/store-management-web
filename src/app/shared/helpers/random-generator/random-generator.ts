import { Generic } from "../../models/generic";
import { RandomSchema } from "src/app/shared/models/random-schema";
import { BaseSelect } from "src/app/shared/models/base-select";
import { createArray } from "src/app/shared/helpers/create-array/create-array";
import { generateSchema } from "src/app/shared/helpers/random-generator/generate-schema";
import { isSchemaType } from "src/app/shared/helpers/random-generator/is-schema-type";
import { isSchema } from "src/app/shared/helpers/random-generator/is-schema";
import { timeIsValid } from "src/app/shared/helpers/time-is-valid/time-is-valid";

export class RandomGenerator {
	static schema<T = Generic>(schemaGenerator: RandomSchema<T>){
		const newObject: Generic = {};
		const entries = Object.entries(schemaGenerator);

		entries.forEach(([key, value]) => {
			if(typeof value === "function") {
				newObject[key] = value();
				return;
			}

			if(isSchemaType(value)){
				newObject[key] = generateSchema(value, RandomGenerator);
				return;
			}

			if(isSchema(value))
				newObject[key] = this.schema(value);
		});

		return newObject as T;
	}

	static array<T>(schema: RandomSchema<T> | (() => any), repeat: number) {
		return new Array(repeat).fill(null).map(() => {
			if (typeof schema === "function") return schema();
			return this.schema<T>(schema)
		}) as T[];
	}

	static date(minDate?: Date | string, maxDate?: Date | string) {
		const start = minDate ? new Date(minDate).getTime() : new Date(0).getTime();
		const end = maxDate ? new Date(maxDate).getTime() : new Date().getTime();

		if (start > end) {
			throw new Error('A data inicial não pode ser posterior à data final');
		}

		const randomTimestamp = Math.floor(Math.random() * (end - start + 1)) + start;
		return new Date(randomTimestamp);
	};

	static integer(min = -99999, max = 99999) {
		min = Math.ceil(min);
		max = Math.floor(max);

		return Math.floor(Math.random() * (max - min)) + min;
	}

	static float(min = -99999, max = 99999) {
		return Math.random() * (max - min) + min;
	}

	static enumKeys<T extends Generic>(enumeration: T): Extract<keyof T, string>[] {
		return Object.keys(enumeration).filter((key) => isNaN(+key)) as Extract<keyof T, string>[];
	}

	static enumValues<T extends Generic>(enumeration: T) {
		return this.enumKeys(enumeration).map((key) => enumeration[key])
	}

	static statusValues<T extends Generic>(enumeration: T) {
		return Object.entries(enumeration)
			.filter(([key]) => typeof (key as unknown) == "string")
			.map(([key, value]) => ({
				id: +value,
				name: key
			}))
			.filter(value => !isNaN(value.id)) as BaseSelect[]
	}

	static status<T extends Generic>(enumeration: T) {
		const statusValues = this.statusValues(enumeration);

		return this.anyOfThese(...statusValues);
	}

	static enumeration<T extends Generic>(enumeration: T) {
		const enumValues = this.enumValues(enumeration);

		return this.anyOfThese(...enumValues);
	}

	static trueFalse() {
		return this.anyOfThese(true, false);
	}

	static word(length: number) {
		const characters = 'abcdefghijklmnopqrstuvwxyz';

		let result = '';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}

		return result;
	}

	static phrase(wordsCount: number) {
		const words = createArray(wordsCount).map(
			() => this.word(this.integer(7, 10))
		);

		return words.join(' ');
	}

	static paragraphs(paragraphsCount: number) {
		const generatePhrases = () => this.phrase(this.integer(8, 16));

		const paragraphs = createArray(paragraphsCount).map(
			generatePhrases
		);

		return paragraphs.join('\n\n');
	}

	static randomHour(minHours = "00:00", maxHours = "23:59") {
		const [minHour, minMinute] = minHours.split(":");
		const [maxHour, maxMinute] = maxHours.split(":");

		if(!timeIsValid(minHours))
			throw new Error(`Min hour ${minHours} is invalid`);

		if(!timeIsValid(maxHours))
			throw new Error(`Max hour ${maxHours} is invalid`);

		const hours: number = this.integer(+minHour, +maxHour);
		let minutes = this.integer(0, 60);

		if (hours === +minHour) {
			minutes = this.integer(+minMinute, 60);
		} else if (hours === +maxHours) {
			minutes = this.integer(0, +maxMinute);
		}

		const hoursFormatted = hours < 10 ? `0${hours}` : hours;
		const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;

		return `${hoursFormatted}:${minutesFormatted}`;
	}

	static hourPeriod(minHour = "00:00", maxHour = "23:59") {
		const start = this.randomHour(minHour, maxHour);
		const end = this.randomHour(start, maxHour);

		return {
			start,
			end
		};
	}

	static anyOfThese<T extends any[]>(...possibilities: T) {
		const index = this.integer(0, possibilities.length);

		return possibilities[index] as T[number];
	}

	static allEnumsButThese<T extends Generic>(enumeration: T, excludedEnums: T[keyof T][]) {
		const all = this.enumValues(enumeration);
		const allButExcluded = all.filter(item => !excludedEnums.includes(item));

		return this.anyOfThese(...allButExcluded);
	}
}
