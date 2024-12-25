import { ExtendedDate } from "src/app/shared/models/extended-date";

export const extendedDate = (date: Date | string = new Date()) => {
	const dateToUse = new Date(date) as ExtendedDate;

	dateToUse.lastDayOf = type => {
		if(type === "month") {
			dateToUse.setMonth(dateToUse.getMonth() + 1);
			dateToUse.setDate(0);
		}

		if(type === 'year') {
			dateToUse.setFullYear(dateToUse.getFullYear() + 1);
			dateToUse.setMonth(0);
			dateToUse.setDate(0);
		}

		if(type === 'week') {
			dateToUse.setDate(dateToUse.getDate() + 7 - dateToUse.getDay());
		}

		return dateToUse;
	}

	dateToUse.firstDayOf = type => {
		if(type === "month") {
			dateToUse.setDate(1);
		}

		if(type === 'year') {
			dateToUse.setMonth(0);
			dateToUse.setDate(1);
		}

		if(type === 'week') {
			dateToUse.setDate(dateToUse.getDate() - dateToUse.getDay());
		}

		return dateToUse;
	}

	dateToUse.minus = (value, type = "day") => {
		if (type === 'day')
			dateToUse.setDate(dateToUse.getDate() - value);

		if (type === 'month')
			dateToUse.setMonth(dateToUse.getMonth() - value);

		if (type === 'year')
			dateToUse.setFullYear(dateToUse.getFullYear() - value);

		if (type === 'week')
			dateToUse.setDate(dateToUse.getDate() - value * 7);

		return dateToUse;
	}

	dateToUse.plus = (value, type = "day") => {
		if (type === 'day')
			dateToUse.setDate(dateToUse.getDate() + value);

		if (type === 'month')
			dateToUse.setMonth(dateToUse.getMonth() + value);

		if (type === 'year')
			dateToUse.setFullYear(dateToUse.getFullYear() + value);

		if (type === 'week')
			dateToUse.setDate(dateToUse.getDate() + value * 7);

		return dateToUse;
	}

	return dateToUse;
}
