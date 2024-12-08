import { Component, inject } from '@angular/core';
import { TableComponent } from "../../../shared/components/table/table.component";
import { Order } from "../models/order";
import { TableColumnFn } from "../../../shared/components/table/table-column-fn";
import { TableActionsFn } from "../../../shared/components/table/table-actions-fn";
import { OrdersService } from "../orders.service";
import { NoResults } from "../../../shared/components/no-results/models/no-results";
import { DialogService } from "../../../shared/services/dialog.service";
import { formatDate } from "@angular/common";
import { rxResource } from "@angular/core/rxjs-interop";
import { ConfirmActionService } from "../../../core/services/confirm-action/confirm-action.service";

@Component({
    selector: 'app-orders-list',
	imports: [
		TableComponent
	],
    templateUrl: './orders-list.component.html',
    styleUrl: './orders-list.component.scss'
})
export class OrdersListComponent {
	service = inject(OrdersService);
	confirm = inject(ConfirmActionService);
	dialog = inject(DialogService);

	resource = rxResource({
		loader: () => this.service.getAll({
			sortProperty: 'date',
			sortDirection: 'desc'
		})
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

	getActions: TableActionsFn<Order> = element => [
		{
			type: "icon",
			icon: "edit",
			iconColor: 'blue',
			tooltip: "Editar",
			relativeRoute: `${element.id}`
		},
		{
			type: "icon",
			icon: "delete",
			iconColor: "red",
			tooltip: "Remover",
			click: () => this.confirm.confirm({
				title: "Excluir pedido",
				description: "Você tem certeza de que deseja excluir este pedido?",
				actions: {
					primary: {
						click: () => {
							this.service.delete(element.id).subscribe(() => {
								this.resource.reload();
							})
						}
					}
				}
			})
		},
	]
}
