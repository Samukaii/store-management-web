import { timeIsValid } from "src/app/shared/helpers/time-is-valid/time-is-valid";

export const timeToMinutes = (time: string) => {
	if(!timeIsValid(time))
		throw new Error('Invalid time');

	const times = time.split(":").map(Number);

	const [hours, minutes] = times;

	return hours * 60 + minutes;
}
