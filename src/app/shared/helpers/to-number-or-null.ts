import { valueIsNumber } from "./value-is-number";

export const toNumberOrNull = (value: unknown) =>
	valueIsNumber(value) ? +value : null

