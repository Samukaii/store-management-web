import { randomSchemaGenerators } from "../helpers/random-schema-generators/random-schema-generators";

export type RandomSchemaType = keyof typeof randomSchemaGenerators;
