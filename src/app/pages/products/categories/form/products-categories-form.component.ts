import { Component, input, output } from '@angular/core';
import { FormComponent } from "src/app/shared/components/form/form/form.component";
import { FormInputComponent } from "src/app/shared/components/form/input/form-input.component";
import { ProductsCategoriesFormValue } from "../models/products-categories-form-value";
import { createProductsCategoriesForm } from "./create-products-categories-form";
import { ProductCategory } from "../models/product-category";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-products-categories-form',
	imports: [
		FormComponent,
		FormInputComponent,
		ReactiveFormsModule
	],
    templateUrl: './products-categories-form.component.html',
    styleUrl: './products-categories-form.component.scss'
})
export class ProductsCategoriesFormComponent {
	data = input<ProductCategory>()
	formSubmit = output<ProductsCategoriesFormValue>()
	form = createProductsCategoriesForm();

	onSubmit() {
		this.formSubmit.emit(this.form.getRawValue());
	}
}
