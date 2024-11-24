import { Component, computed, input } from '@angular/core';
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FormControlNames } from "../../../models/form-control-names";
import { BasicOption } from "../../../models/basic-option";

@Component({
	selector: 'app-form-radio',
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
	direction = input<"vertical" | "horizontal">("vertical");
	name = input.required<FormControlNames<Form>>();
	options = input<BasicOption[]>([]);

	flexDirection = computed(() => this.direction() === "vertical" ? "column" : "row");
}
