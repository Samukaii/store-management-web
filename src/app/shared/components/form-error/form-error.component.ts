import { Component, computed, input, isSignal, Signal } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MatError } from "@angular/material/form-field";

export const controlError = (control: FormControl | Signal<FormControl>) => {
	const formControl = computed(() => {
		if (isSignal(control)) return control();

		return control;
	})

	const controlInvalid = computed(() => {
		return formControl().status === "INVALID"
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

@Component({
	selector: 'app-form-error',
	imports: [
		MatError
	],
	templateUrl: './form-error.component.html',
	styleUrl: './form-error.component.scss'
})
export class FormErrorComponent {
	control = input.required<FormControl>();

	error = controlError(this.control);
}
