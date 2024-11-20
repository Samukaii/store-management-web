import { Component, inject } from '@angular/core';
import {
	LocalActionsUpdaterComponent
} from "../../../shared/components/local-actions/updater/local-actions-updater.component";
import { TableComponent } from "../../../shared/components/table/table.component";
import { Order } from "../models/order";
import { Button } from "../../../shared/components/button/models/button";
import { routeNames } from "../../../shared/route-names";
import { TableColumnFn } from "../../../shared/components/table/table-column-fn";
import { TableActionsFn } from "../../../shared/components/table/table-actions-fn";
import { OrdersService } from "../orders.service";
import { resource } from "../../../shared/signals/resource";
import { NoResults } from "../../../shared/components/no-results/models/no-results";
import { DialogService } from "../../../shared/services/dialog.service";
import { OrdersImportComponent } from "../import/orders-import.component";
import { formatDate } from "@angular/common";

@Component({
	selector: 'app-orders-list',
	standalone: true,
	imports: [
		TableComponent,
		LocalActionsUpdaterComponent
	],
	templateUrl: './orders-list.component.html',
	styleUrl: './orders-list.component.scss'
})
export class OrdersListComponent {
	service = inject(OrdersService);
	dialog = inject(DialogService);

	resource = resource({
		initialValue: [],
		loader: () => this.service.getAll()
	});

	noResults: NoResults = {
		label: "Nenhum pedido adicionado",
		description: "Quando algum for adicionado ele aparecerá aqui",
		icon: "menu_book"
	}

	getColumns: TableColumnFn<Order> = element => [
		{
			position: "id",
			label: "ID",
			value: element.id
		},
		{
			position: "code",
			label: "Código do pedido",
			value: `#${element.code}`
		},
		{
			position: "date",
			label: "Data",
			value: formatDate(element.date, 'dd/MM/yyyy (HH:mm)', 'en')
		},
		{
			position: "note",
			label: "Nota",
			value: element.customerInfo
		},
		{
			position: "total",
			label: "Total",
			value: `R$ ${element.total.toFixed(2)}`
		},
	]

	actions: Button[] = [
		{
			type: "flat",
			label: "Importar pedidos do IFood",
			click: () => {
				this.dialog.open({
					component: OrdersImportComponent,
					data: {
						formSubmit: (value) => {
							this.service.import(value).subscribe(() => {
								this.resource.refresh();
								this.dialog.closeAll();
							})
						}
					}
				})
			}
		}
	]

	getActions: TableActionsFn<Order> = element => [
		{
			type: "icon",
			icon: "edit",
			tooltip: "Editar",
			relativeRoute: `${element.id}`
		},
	]
}
