import { toNumberOrNull } from "./to-number-or-null";

export const toIdentifiable = (value: unknown) => {
	const asNumber = toNumberOrNull(value);

	if (asNumber !== null) return asNumber;

	if (typeof value === "string")
		return value;

	return null;
}

