import { isObjectLiteral } from "./is-object-literal";

export const distinctValue = (prev: unknown, curr: unknown): boolean => {
	if (typeof prev !== typeof curr) return true;

	if (prev instanceof Date && curr instanceof Date)
		return prev.getTime() === curr.getTime();

	if (Array.isArray(prev) && Array.isArray(curr)) {
		if (prev.length !== curr.length) return false;

		return prev.every((item, index) => distinctValue(item, curr[index]));
	}

	if (isObjectLiteral(prev) && isObjectLiteral(curr)) {
		const prevEntries = Object.entries(prev);
		const currEntries = Object.entries(curr);

		if (prevEntries.length !== currEntries.length) return false;

		return prevEntries.every(([key, value]) => {
			return distinctValue(value, curr[key]);
		});
	}

	return prev === curr;
}
