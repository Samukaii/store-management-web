import { Component, inject, input, signal } from '@angular/core';
import { Order } from "../models/order";
import { OrdersService } from "../orders.service";
import { ActivatedRoute, Router } from "@angular/router";
import { injectRouterActions } from "src/app/shared/di/inject-router-actions";
import { createOrdersForm } from "src/app/pages/orders/form/create-orders-form";
import { FormBuilder } from "@angular/forms";
import { OrdersFormComponent } from "src/app/pages/orders/form/orders-form.component";
import { OrdersFormValue } from "src/app/pages/orders/models/orders-form-value";

@Component({
    selector: 'app-orders-create',
	imports: [
		OrdersFormComponent
	],
    templateUrl: './orders-create.component.html',
    styleUrl: './orders-create.component.scss'
})
export class OrdersCreateComponent {
	id = input.required<number>();
	data = signal<Order | null>(null);

	service = inject(OrdersService);
	actions = injectRouterActions();
	router = inject(Router);
	fb = inject(FormBuilder);
	route = inject(ActivatedRoute);

	form = createOrdersForm();

	create(value: OrdersFormValue) {
		this.service.create(value).subscribe(() => {
			this.router.navigate(['..'], {
				queryParams: {
					tab: 1
				},
				relativeTo: this.route
			});
		});
	}
}
