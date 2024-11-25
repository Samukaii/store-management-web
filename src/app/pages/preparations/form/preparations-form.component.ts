import { Component, input, output } from '@angular/core';
import { FormComponent } from "../../../shared/components/form/form/form.component";
import { Preparation } from "../models/preparation";
import { FormInputComponent } from "../../../shared/components/form/input/form-input.component";
import { PreparationsFormValue } from "../models/preparations-form-value";
import { createPreparationsForm } from "./create-preparations-form";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-preparations-form',
	imports: [
		FormComponent,
		FormInputComponent,
		ReactiveFormsModule
	],
    templateUrl: './preparations-form.component.html',
    styleUrl: './preparations-form.component.scss'
})
export class ProductsFormComponent {
	data = input<Preparation>()
	formSubmit = output<PreparationsFormValue>()
	form = createPreparationsForm();

	onSubmit() {
		this.formSubmit.emit(this.form.getRawValue());
	}
}
