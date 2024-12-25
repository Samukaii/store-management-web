import { DateOperationType } from "src/app/shared/models/date-operation-type";

export interface ExtendedDate extends Date {
	lastDayOf: (type: Exclude<DateOperationType, 'day'>) => ExtendedDate;
	firstDayOf: (type: Exclude<DateOperationType, 'day'>) => ExtendedDate;
	minus: (value: number, type?: DateOperationType) => ExtendedDate;
	plus: (value: number, type?: DateOperationType) => ExtendedDate;
}
