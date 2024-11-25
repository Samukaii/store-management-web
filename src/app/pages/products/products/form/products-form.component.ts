import { Component, inject, input, output } from '@angular/core';
import { FormComponent } from "../../../../shared/components/form/form/form.component";
import { Product } from "../models/product";
import { FormInputComponent } from "../../../../shared/components/form/input/form-input.component";
import { ProductsFormValue } from "../models/products-form-value";
import { createProductsForm } from "./create-products-form";
import { AutocompleteComponent } from "../../../../shared/components/autocomplete/autocomplete.component";
import { FormModifier } from "../../../../shared/models/form-modifier";
import { ProductsForm } from "../models/products-form";
import { OrdersItemsService } from "../../../orders/items/orders-items.service";
import { ProductsCategoriesService } from "../../categories/products-categories.service";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-products-form',
	imports: [
		FormComponent,
		FormInputComponent,
		AutocompleteComponent,
		ReactiveFormsModule
	],
    templateUrl: './products-form.component.html',
    styleUrl: './products-form.component.scss'
})
export class ProductsFormComponent {
	data = input<Product>()
	formSubmit = output<ProductsFormValue>()
	form = createProductsForm();
	ordersItemsService = inject(OrdersItemsService);
	categoriesService = inject(ProductsCategoriesService);

	modifiers: FormModifier<ProductsForm, Product>[] = [
		{
			key: 'categoryId',
			modifier: source => source.category.id
		}
	];

	onSubmit() {
		this.formSubmit.emit(this.form.getRawValue());
	}
}
