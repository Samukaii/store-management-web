import { RandomSchemaType } from "src/app/shared/models/random-schema-type";
import { RandomGenerator } from "src/app/shared/helpers/random-generator/random-generator";
import {
	randomSchemaGenerators
} from "src/app/shared/helpers/random-generator/static/random-schema-generators";

export const generateSchema = (type: RandomSchemaType, generator: typeof RandomGenerator) => randomSchemaGenerators[type](generator);
