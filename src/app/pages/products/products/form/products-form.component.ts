import { Component, inject, input, output } from '@angular/core';
import { FormComponent } from "src/app/shared/components/form/form/form.component";
import { Product } from "../models/product";
import { FormInputComponent } from "src/app/shared/components/form/input/form-input.component";
import { ProductsFormValue } from "../models/products-form-value";
import { createProductsForm } from "./create-products-form";
import { AutocompleteComponent } from "src/app/shared/components/autocomplete/autocomplete.component";
import { FormModifier } from "src/app/shared/models/form-modifier";
import { ProductsForm } from "../models/products-form";
import { OrdersItemsService } from "../../../orders/items/orders-items.service";
import { ProductsCategoriesService } from "../../categories/products-categories.service";
import { ReactiveFormsModule } from "@angular/forms";
import { AutocompleteNoResults } from "src/app/shared/components/autocomplete/no-results/autocomplete-no.results";
import { Generic } from "src/app/shared/models/generic";

@Component({
    selector: 'app-products-form',
	imports: [
		FormComponent,
		FormInputComponent,
		AutocompleteComponent,
		ReactiveFormsModule,
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
			modifier: source => source.category?.id
		},
	];

	noResults = AutocompleteNoResults.autoCreation(() => {
		return {
			noResultsIcon: "category",
			method: ((params: Generic) => this.categoriesService.create(params as any)) as any,
			key: "name"
		}
	});

	onSubmit() {
		this.formSubmit.emit(this.form.getRawValue());
	}
}
