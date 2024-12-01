import { Moment } from "moment";
import moment from "moment/moment";

export const isDate = (value: unknown): value is string | Date | Moment => {
	if (moment.isMoment(value)) return true;
	if (typeof value !== "string") return false;

	return !isNaN(new Date(value).getTime());
}
