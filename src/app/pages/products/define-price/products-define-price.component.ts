import { Component, computed, input, output } from '@angular/core';
import {
	createProductsDefinePriceForm,
	ProductsDefinePricePayload
} from "./create-products-define-price.form";
import { toSignal } from "@angular/core/rxjs-interop";
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { AutocompleteComponent } from "../../../shared/components/autocomplete/autocomplete.component";
import { FlexRowComponent } from "../../../shared/components/flex-row/flex-row.component";
import { FormComponent } from "../../../shared/components/form/form/form.component";
import { FormInputComponent } from "../../../shared/components/form/input/form-input.component";
import { FormRadioComponent } from "../../../shared/components/form/radio/form-radio.component";
import { Product } from "../models/product";

@Component({
    selector: 'app-products-define-price',
    imports: [
        AutocompleteComponent,
        ButtonComponent,
        FlexRowComponent,
        FormComponent,
        FormInputComponent,
        FormRadioComponent
    ],
    templateUrl: './products-define-price.component.html',
    styleUrl: './products-define-price.component.scss'
})
export class ProductsDefinePriceComponent {
	product = input<Product>();
	formSubmit = output<ProductsDefinePricePayload>();

	form = createProductsDefinePriceForm(this.product()!);

	formValue = toSignal(this.form.valueChanges, {
		initialValue: this.form.value,
	});

	onSubmit() {
		this.formSubmit.emit(this.form.getRawValue());
	}

	price = computed(() => this.formValue().price ?? 0);

	totalCosts = computed(() => this.product()?.totalCost ?? 0);

	variableTaxes = computed(() => this.price() * 0.26);

	profit = computed(() => {
		const costs = this.variableTaxes() + this.totalCosts();

		return this.price() - costs;
	});

	profitMargin = computed(() => {
		if(this.profit() < 0) return 0;

		return (this.profit() / this.price()) * 100
	});
}
