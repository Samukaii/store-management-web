import {
	randomSchemaGenerators
} from "src/app/shared/helpers/random-schema-generators/static/random-schema-generators";

export type RandomSchemaType = keyof typeof randomSchemaGenerators;
