import { Component, inject, input, output } from '@angular/core';
import { FormComponent } from "../../../shared/components/form/form/form.component";
import { Product } from "../models/product";
import { FormInputComponent } from "../../../shared/components/form/input/form-input.component";
import { FormRadioComponent } from "../../../shared/components/form/radio/form-radio.component";
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { FlexRowComponent } from "../../../shared/components/flex-row/flex-row.component";
import { ProductsFormValue } from "../models/products-form-value";
import { createProductsForm } from "./create-products-form";
import { AutocompleteComponent } from "../../../shared/components/autocomplete/autocomplete.component";
import { OrdersItemsService } from "../../orders/items/orders-items.service";
import { JsonPipe } from "@angular/common";

@Component({
    selector: 'app-products-form',
    imports: [
        FormComponent,
        FormInputComponent,
        FormRadioComponent,
        ButtonComponent,
        FlexRowComponent,
        AutocompleteComponent,
        JsonPipe
    ],
    templateUrl: './products-form.component.html',
    styleUrl: './products-form.component.scss'
})
export class ProductsFormComponent {
	data = input<Product>()
	formSubmit = output<ProductsFormValue>()
	form = createProductsForm();
	ordersItemsService = inject(OrdersItemsService);

	onSubmit() {
		this.formSubmit.emit(this.form.getRawValue());
	}
}
