import { Component, effect, input, output } from '@angular/core';
import { FormComponent } from "../../../shared/components/form/form/form.component";
import { Order } from "../models/order";
import { FormInputComponent } from "../../../shared/components/form/input/form-input.component";
import { FormRadioComponent } from "../../../shared/components/form/radio/form-radio.component";
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { FlexRowComponent } from "../../../shared/components/flex-row/flex-row.component";
import { OrdersFormValue } from "../models/orders-form-value";
import { createOrdersForm } from "./create-orders-form";

@Component({
    selector: 'app-orders-form',
    imports: [
        FormComponent,
        FormInputComponent,
        FormRadioComponent,
        ButtonComponent,
        FlexRowComponent
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
