import { ValidatorFn } from "@angular/forms";
import { toNumberOrNull } from "../helpers/to-number-or-null";

export const greaterThanZero: ValidatorFn = (control) => {
	const value = toNumberOrNull(control.value);

	if(value === null) return {
		customError: "Não é um número",
	}

	if(value > 0) return null;

	return {
		customError: "Não pode ser zero"
	}
}
