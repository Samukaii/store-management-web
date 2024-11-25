import { Component, input, output } from '@angular/core';
import { FormComponent } from "../../../../shared/components/form/form/form.component";
import { FormInputComponent } from "../../../../shared/components/form/input/form-input.component";
import { RawMaterialsCategoriesFormValue } from "../models/raw-materials-categories-form-value";
import { createRawMaterialsCategoriesForm } from "./create-raw-materials-categories-form";
import { RawMaterialCategory } from "../models/raw-material-category";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-raw-materials-categories-form',
	imports: [
		FormComponent,
		FormInputComponent,
		ReactiveFormsModule
	],
    templateUrl: './raw-materials-categories-form.component.html',
    styleUrl: './raw-materials-categories-form.component.scss'
})
export class RawMaterialsCategoriesFormComponent {
	data = input<RawMaterialCategory>()
	formSubmit = output<RawMaterialsCategoriesFormValue>()
	form = createRawMaterialsCategoriesForm();

	onSubmit() {
		this.formSubmit.emit(this.form.getRawValue());
	}
}
