import { RandomSchemaType } from "src/app/shared/models/random-schema-type";
import {
	randomSchemaGenerators
} from "src/app/shared/helpers/random-schema-generators/static/random-schema-generators";

export const isSchemaType = (value: unknown): value is RandomSchemaType =>
	!!randomSchemaGenerators[value as RandomSchemaType];
