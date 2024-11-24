export const valueIsNumber = (value: unknown): value is string | number => {
	if(typeof value === "number") return true;
	if(typeof value !== "string") return false;

	return !isNaN(+value);
};
