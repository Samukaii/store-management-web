import { Component, inject, input, signal } from '@angular/core';
import { Order } from "../models/order";
import { OrdersService } from "../orders.service";
import { WindowLoadingComponent } from "../../../core/components/window-loading/window-loading.component";
import { Router } from "@angular/router";
import { injectRouterActions } from "../../../shared/di/inject-router-actions";
import { OrdersItemsComponent } from "../items/orders-items.component";
import { CurrencyPipe, DatePipe } from "@angular/common";
import { rxResource } from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-orders-update',
	imports: [
		WindowLoadingComponent,
		OrdersItemsComponent,
		DatePipe,
		CurrencyPipe
	],
    templateUrl: './orders-update.component.html',
    styleUrl: './orders-update.component.scss'
})
export class OrdersUpdateComponent {
	id = input.required<number>();
	data = signal<Order | null>(null);
	service = inject(OrdersService);
	actions = injectRouterActions();
	router = inject(Router);

	resource = rxResource({
		request: this.id,
		loader: ({request: id}) => this.service.single(id)
	});
}
