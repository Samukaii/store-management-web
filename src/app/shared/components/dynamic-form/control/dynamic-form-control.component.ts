import { Component, effect, inject, input } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { DynamicFormControl } from "../models/dynamic-form-control";
import { FormInputComponent } from "../../form/input/form-input.component";
import { AutocompleteComponent } from "../../autocomplete/autocomplete.component";

@Component({
	selector: 'app-dynamic-form-control',
	imports: [
		FormInputComponent,
		AutocompleteComponent
	],
	templateUrl: './dynamic-form-control.component.html',
	styleUrl: './dynamic-form-control.component.scss'
})
export class DynamicFormControlComponent {
	form = input.required<FormGroup>();
	control = input.required<DynamicFormControl>();

	formControl = inject(FormBuilder).control(null as any);

	createControl = effect(() => {
		const control = this.control();

		this.formControl.setValue(control.defaultValue);
		this.formControl.setValidators(control.validators ?? []);
		this.formControl.updateValueAndValidity();

		this.form().addControl(control.key, this.formControl);
	});
}
