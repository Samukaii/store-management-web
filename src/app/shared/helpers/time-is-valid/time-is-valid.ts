import { toNumberOrNull } from "src/app/shared/helpers/to-number-or-null/to-number-or-null";

export const timeIsValid = (time: string) => {
	if(!time.includes(":"))
		return false;

	const times = time.split(":").map(toNumberOrNull);

	if(times.length > 2)
		return false;

	const [hours, minutes] = times;

	if(hours === null || minutes === null)
		return false;

	if(hours > 23) return false;
	if(hours < 0) return false;

	if(minutes > 59) return false;

	return minutes >= 0;
}
