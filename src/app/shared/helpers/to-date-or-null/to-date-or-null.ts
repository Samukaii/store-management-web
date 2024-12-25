import moment from "moment/moment";
import { isDate } from "src/app/shared/helpers/is-date/is-date";

export const toDateOrNull = (value: unknown) => {
	if (!isDate(value)) return null;

	if (moment.isMoment(value)) return value.toDate();

	return new Date(value);
}
