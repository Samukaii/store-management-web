import { FormControl } from "@angular/forms";
import { computed, inject, isSignal, Signal } from "@angular/core";
import { startWith } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

export const controlError = (control: FormControl | Signal<FormControl>) => {
	const formControl = computed(() => {
		if (isSignal(control)) return control();

		return control;
	})

	const status$ = formControl().statusChanges.pipe(startWith(formControl().status))
	const status = toSignal(status$);

	const controlInvalid = computed(() => {
		return status() === "INVALID"
	});

	const error = computed(() => {
		controlInvalid();

		return formControl().errors;
	});

	const message = computed(() => {
		const errors = error();

		if (!errors) return null;

		if (errors['required']) return "Campo obrigatório";

		if (errors['customError']) return errors['customError'] as string;

		return null;
	});

	return {
		hasError: computed(() => !!message()),
		message
	}
}
