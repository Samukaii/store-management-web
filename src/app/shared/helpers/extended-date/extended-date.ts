import { DateOperationType } from "src/app/shared/models/date-operation-type";

export const extendedDate = (date = new Date()) => {
	const dateToUse = new Date(date);

	return {
		lastDayOf: (type: Exclude<DateOperationType, 'day'>) => {
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

			return extendedDate(dateToUse);
		},
		firstDayOf: (type: Exclude<DateOperationType, 'day'>) => {
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

			return extendedDate(dateToUse);
		},
		minus: (value: number, type: DateOperationType = 'day') => {
			if (type === 'day')
				dateToUse.setDate(dateToUse.getDate() - value);

			if (type === 'month')
				dateToUse.setMonth(dateToUse.getMonth() - value);

			if (type === 'year')
				dateToUse.setFullYear(dateToUse.getFullYear() - value);

			if (type === 'week')
				dateToUse.setDate(dateToUse.getDate() - value * 7);

			return extendedDate(dateToUse);
		},
		plus: (value: number, type: DateOperationType = 'day') => {
			if (type === 'day')
				dateToUse.setDate(dateToUse.getDate() + value);

			if (type === 'month')
				dateToUse.setMonth(dateToUse.getMonth() + value);

			if (type === 'year')
				dateToUse.setFullYear(dateToUse.getFullYear() + value);

			if (type === 'week')
				dateToUse.setDate(dateToUse.getDate() + value * 7);

			return extendedDate(dateToUse);
		},
		get: () => dateToUse,
		getISO: () => dateToUse.toISOString(),
	}
}
