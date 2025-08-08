import { Component, effect, inject, input, output } from '@angular/core';
import { FormComponent } from "src/app/shared/components/form/form/form.component";
import { Order } from "../models/order";
import { FormInputComponent } from "src/app/shared/components/form/input/form-input.component";
import { OrdersFormValue } from "../models/orders-form-value";
import { createOrdersForm } from "./create-orders-form";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {AutocompleteComponent} from "src/app/shared/components/autocomplete/autocomplete.component";
import {ButtonComponent} from "src/app/shared/components/button/button.component";
import {DatePickerComponent} from "src/app/shared/components/date-picker/date-picker.component";
import {FlexRowComponent} from "src/app/shared/components/flex-row/flex-row.component";
import { ProductsFormValue } from "src/app/pages/products/products/models/products-form-value";
import { ProductsService } from "src/app/pages/products/products/products.service";
import { FormModifier } from "src/app/shared/models/form-modifier";
import { OrdersForm } from "src/app/pages/orders/models/orders-form";

@Component({
    selector: 'app-orders-form',
    imports: [
        FormComponent,
        FormInputComponent,
        ReactiveFormsModule,
        AutocompleteComponent,
        ButtonComponent,
        DatePickerComponent,
        FlexRowComponent
    ],
    templateUrl: './orders-form.component.html',
    styleUrl: './orders-form.component.scss'
})
export class OrdersFormComponent {
	data = input<Order>()
	formSubmit = output<OrdersFormValue>();

	productsService = inject(ProductsService);
	fb = inject(FormBuilder);

	form = createOrdersForm();
	disabled = input(false);

	disableForm = effect(() => {
		if (this.disabled()) this.form.disable();
		else this.form.enable();
	})

	addProduct() {
		const form = this.fb.group({
			productId: [null as any as number, Validators.required],
			quantity: [null as any as number, Validators.required],
		})

		this.form.controls.items.push(form);
	}


	onSubmit() {
		this.formSubmit.emit(this.form.getRawValue());
	}
}
