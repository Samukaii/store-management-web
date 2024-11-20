import { Component, effect, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FormHelper } from "../../../helpers/form-helper";
import { Generic } from "../../../models/generic";
import { FormModifier } from "../../../models/form-modifier";

@Component({
	selector: 'app-form',
	standalone: true,
	imports: [
		ReactiveFormsModule
	],
	templateUrl: './form.component.html',
	styleUrl: './form.component.scss'
})
export class FormComponent<Data extends Generic, Form extends FormGroup> {
	form = input.required<Form>();
	data = input<Data>();
	modifiers = input<FormModifier<Form, Data>[]>([]);

	updateForm = effect(() => {
		const data = this.data();

		if(!data) return;

		FormHelper.patchForm(this.form(), data, this.modifiers())
	});
}
