import { Component, effect, input, output } from '@angular/core';
import { FormComponent } from "src/app/shared/components/form/form/form.component";
import { Order } from "../models/order";
import { FormInputComponent } from "src/app/shared/components/form/input/form-input.component";
import { OrdersFormValue } from "../models/orders-form-value";
import { createOrdersForm } from "./create-orders-form";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-orders-form',
	imports: [
		FormComponent,
		FormInputComponent,
		ReactiveFormsModule
	],
    templateUrl: './orders-form.component.html',
    styleUrl: './orders-form.component.scss'
})
export class OrdersFormComponent {
	data = input<Order>()
	formSubmit = output<OrdersFormValue>()
	form = createOrdersForm();
	disabled = input(false);

	disableForm = effect(() => {
		if (this.disabled()) this.form.disable();
		else this.form.enable();
	})

	onSubmit() {
		this.formSubmit.emit(this.form.getRawValue());
	}
}
