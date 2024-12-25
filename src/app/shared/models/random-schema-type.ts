import {
	randomSchemaGenerators
} from "src/app/shared/helpers/random-generator/static/random-schema-generators";

export type RandomSchemaType = keyof typeof randomSchemaGenerators;
