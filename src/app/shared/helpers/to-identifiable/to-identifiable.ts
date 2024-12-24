import { toNumberOrNull } from "src/app/shared/helpers/to-number-or-null/to-number-or-null";

export const toIdentifiable = (value: unknown) => {
	const asNumber = toNumberOrNull(value);

	if (asNumber !== null) return asNumber;

	if (typeof value === "string")
		return value;

	return null;
}

