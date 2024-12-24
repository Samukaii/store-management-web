export const createArray = (repeat: number, startValue = 0) => {
	return new Array(repeat).fill(null).map((_, index) => index + startValue);
};
