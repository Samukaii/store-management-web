import { Component, computed, input, output } from '@angular/core';
import { createProductsDefinePriceForm, ProductsDefinePricePayload } from "./create-products-define-price.form";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormComponent } from "../../../../shared/components/form/form/form.component";
import { FormInputComponent } from "../../../../shared/components/form/input/form-input.component";
import { Product } from "../models/product";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-products-define-price',
	imports: [
		FormComponent,
		FormInputComponent,
		ReactiveFormsModule
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
	idealProfitMargin = computed(() => 0.33);

	variableTaxesAnotai = 0.06;
	variableTaxesIfood = 0.26;

	variableTaxesAnotaiValue = computed(() => this.price() * 0.06);
	variableTaxesIfoodValue = computed(() => this.price() * 0.26);

	suggestedPriceIfood = computed(() => {
		const costs = this.totalCosts();

		return (costs / (1 - this.idealProfitMargin() - this.variableTaxesIfood))
	});

	suggestedPriceAnotai = computed(() => {
		const costs = this.totalCosts();

		return (costs / (1 - this.idealProfitMargin() - this.variableTaxesAnotai))
	});

	profitIfood = computed(() => {
		const costs = this.variableTaxesIfoodValue() + this.totalCosts();

		return this.price() - costs;
	});

	profitAnotai = computed(() => {
		const costs = this.variableTaxesAnotaiValue() + this.totalCosts();

		return this.price() - costs;
	});

	profitMarginIfood = computed(() => {
		if(this.profitIfood() < 0) return 0;
		if(this.price() <= 0) return 0;

		return (this.profitIfood() / this.price()) * 100
	});

	profitMarginAnotai = computed(() => {
		if(this.profitAnotai() < 0) return 0;
		if(this.price() <= 0) return 0;

		return (this.profitAnotai() / this.price()) * 100
	});
}
