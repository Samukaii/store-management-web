import moment, { isDate } from "moment/moment";

export const toDateOrNull = (value: unknown) => {
	if (!isDate(value)) return null;

	if (moment.isMoment(value)) return value.toDate();

	return new Date(value);
}
