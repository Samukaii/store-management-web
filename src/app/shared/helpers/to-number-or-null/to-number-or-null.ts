import { valueIsNumber } from "src/app/shared/helpers/value-is-number/value-is-number";

export const toNumberOrNull = (value: unknown) =>
	valueIsNumber(value) ? +value : null

