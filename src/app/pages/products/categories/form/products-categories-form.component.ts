import { Component, input, output } from '@angular/core';
import { FormComponent } from "../../../../shared/components/form/form/form.component";
import { FormInputComponent } from "../../../../shared/components/form/input/form-input.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { FlexRowComponent } from "../../../../shared/components/flex-row/flex-row.component";
import { ProductsCategoriesFormValue } from "../models/products-categories-form-value";
import { createProductsCategoriesForm } from "./create-products-categories-form";
import { ProductCategory } from "../models/product-category";

@Component({
    selector: 'app-products-categories-form',
	imports: [
		FormComponent,
		FormInputComponent,
		ButtonComponent,
		FlexRowComponent
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
