import { isDate } from "./is-date";
import moment from "moment/moment";

export const toDateOrNull = (value: unknown) => {
	if (!isDate(value)) return null;

	if (moment.isMoment(value)) return value.toDate();

	return new Date(value);
}
