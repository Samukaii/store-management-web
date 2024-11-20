import { Component, inject, input, output } from '@angular/core';
import {
	LocalActionsUpdaterComponent
} from "../../../shared/components/local-actions/updater/local-actions-updater.component";
import { TableComponent } from "../../../shared/components/table/table.component";
import { OrdersService } from "../orders.service";
import { TableColumnFn } from "../../../shared/components/table/table-column-fn";
import { Order } from "../models/order";
import { Button } from "../../../shared/components/button/models/button";
import { TableActionsFn } from "../../../shared/components/table/table-actions-fn";
import { OrdersItemsService } from "./orders-items.service";
import { DialogService } from "../../../shared/services/dialog.service";
import { NoResults } from "../../../shared/components/no-results/models/no-results";
import { OrderItem } from "../models/order-item";
import { of } from "rxjs";
import { rxResource } from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-orders-items',
    imports: [
        LocalActionsUpdaterComponent,
        TableComponent
    ],
    templateUrl: './orders-items.component.html',
    styleUrl: './orders-items.component.scss'
})
export class OrdersItemsComponent {
	service = inject(OrdersItemsService);
	productsService = inject(OrdersService);
	dialog = inject(DialogService);
	product = input<Order>();
	requestUpdate = output();

	resource = rxResource({
		request: () => ({productId: this.product()?.id}),
		loader: ({request: {productId}}) => {
			if(!productId) return of<OrderItem[]>([]);
			return this.service.getAll()
		}
	});

	noResults: NoResults = {
		label: "Nenhum produto foi adicionado a este pedido",
		icon: "lunch_dining"
	}

	getColumns: TableColumnFn<OrderItem> = element => [
		{
			position: "id",
			label: "ID",
			value: element.id
		},
		{
			position: "name",
			label: "Nome",
			value: element.name
		},
		{
			position: "quantity",
			label: "Quantidade",
			value: element.quantity
		},
		{
			position: "cost",
			label: "Total",
			value: `R$ ${element.total.toFixed(2)}`
		},
	]

	actions: Button[] = [
	]

	getActions: TableActionsFn<OrderItem> = element => [
	];
}
