import { Component, inject } from '@angular/core';
import {
	LocalActionsUpdaterComponent
} from "../../../shared/components/local-actions/updater/local-actions-updater.component";
import { TableComponent } from "../../../shared/components/table/table.component";
import { Product } from "../models/product";
import { Button } from "../../../shared/components/button/models/button";
import { routeNames } from "../../../shared/route-names";
import { TableColumnFn } from "../../../shared/components/table/table-column-fn";
import { TableActionsFn } from "../../../shared/components/table/table-actions-fn";
import { ProductsService } from "../products.service";
import { resource } from "../../../shared/signals/resource";
import { NoResults } from "../../../shared/components/no-results/models/no-results";
import { OrdersImportComponent } from "../../orders/import/orders-import.component";
import { DialogService } from "../../../shared/services/dialog.service";
import { ProductsImportComponent } from "../import/products-import.component";

@Component({
    selector: 'app-products-list',
    imports: [
        TableComponent,
        LocalActionsUpdaterComponent
    ],
    templateUrl: './products-list.component.html',
    styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
	service = inject(ProductsService);
	dialog = inject(DialogService);

	resource = resource({
		initialValue: [],
		loader: () => this.service.getAll()
	});

	noResults: NoResults = {
		label: "Nenhum produto adicionado",
		description: "Quando algum for adicionado ele aparecerá aqui",
		icon: "lunch_dining"
	}

	getColumns: TableColumnFn<Product> = element => [
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
			position: "price",
			label: "Preço",
			value: !!element.price ? `R$ ${element.price.toFixed(2)}` : "Sem preço"
		},
		{
			position: "profit",
			label: "Lucro",
			value: `R$ ${element.profit.toFixed(2)}`
		},
		{
			position: "profitMargin",
			label: "Margem de lucro",
			value: `${element.profitMargin.toFixed(2)}%`
		},
	]

	actions: Button[] = [
		{
			type: "stroked",
			label: "Importar produtos do IFood",
			click: () => {
				this.dialog.open({
					component: ProductsImportComponent,
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
		},
		{
			type: "flat",
			label: "Adicionar produto",
			relativeRoute: `${routeNames.products}/${routeNames.new}`
		}
	]

	getActions: TableActionsFn<Product> = element => [
		{
			type: "icon",
			icon: "edit",
			tooltip: "Editar",
			relativeRoute: `${element.id}`
		},
		{
			type: "icon",
			icon: "delete",
			tooltip: "Remover",
			click: () => this.service.delete(element.id).subscribe(() => {
				this.resource.refresh();
			})
		},
	]
}
