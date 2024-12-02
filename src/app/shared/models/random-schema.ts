import { RandomSchemaType } from "./random-schema-type";
import { Generic } from "./generic";

export type RandomSchema<T = Generic> = {
	[key in keyof T]?: RandomSchemaType | RandomSchema<T[key]> | (() => any)
};

