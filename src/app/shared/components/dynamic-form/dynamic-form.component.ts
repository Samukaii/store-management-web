import { Component, computed, input } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { DynamicForm, DynamicFormControl } from "./models/dynamic-form-control";
import { DynamicFormControlComponent } from "./control/dynamic-form-control.component";

@Component({
	selector: 'app-dynamic-form',
	imports: [
		DynamicFormControlComponent
	],
	templateUrl: './dynamic-form.component.html',
	styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent {
	form = input.required<FormGroup>();
	formConfig = input.required<DynamicForm>();

	controls = computed(() => {
		return Object.entries(this.formConfig()).map(([key, value]) => {
			return {
				...value,
				key,
			} as DynamicFormControl;
		})
	})
}
