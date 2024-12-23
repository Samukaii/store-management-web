import { spyDependency } from "../spies/spy-dependency";
import { ConfirmActionService } from "../../shared/components/confirm-action/confirm-action.service";

export const testConfirmAction = () => {
	const table = spyDependency(ConfirmActionService, 'confirm');

	const options = () => {
		const lastCall = table.mock.lastCall?.[0];

		if(!lastCall)
			throw new Error("The confirm action is not opened. Please make sure your function is opening the dialog");

		return lastCall;
	}

	return {
		options,
		primaryClick: () => {
			options()?.actions?.primary?.click?.({});
		}
	}
};
