import { booleanAttribute, Component, computed, effect, input } from '@angular/core';
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
	selectFirstOption = input(false, {transform: booleanAttribute});

	selectFirst = effect(() => {
		if(!this.selectFirstOption()) return;

		this.form().get(this.name())?.setValue(this.options()[0].value as any);
	});

	flexDirection = computed(() => this.direction() === "vertical" ? "column" : "row");
}
