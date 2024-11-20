import { Component, input } from '@angular/core';
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FormControlNames } from "../../../models/form-control-names";
import { BasicOption } from "../../../models/basic-option";

@Component({
	selector: 'app-form-radio',
	standalone: true,
	imports: [
		MatRadioGroup,
		MatRadioButton,
		ReactiveFormsModule
	],
	templateUrl: './form-radio.component.html',
	styleUrl: './form-radio.component.scss'
})
export class FormRadioComponent<Form extends FormGroup> {
	form = input.required<Form>();
	label = input("");
	name = input.required<FormControlNames<Form>>();
	options = input<BasicOption[]>([]);
}
