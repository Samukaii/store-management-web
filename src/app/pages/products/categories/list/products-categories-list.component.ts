import { Component, inject } from '@angular/core';
import {
	LocalActionsUpdaterComponent
} from "../../../../shared/components/local-actions/updater/local-actions-updater.component";
import { TableComponent } from "../../../../shared/components/table/table.component";
import { ProductCategory } from "../models/product-category";
import { Button } from "../../../../shared/components/button/models/button";
import { routeNames } from "../../../../shared/route-names";
import { TableColumnFn } from "../../../../shared/components/table/table-column-fn";
import { TableActionsFn } from "../../../../shared/components/table/table-actions-fn";
import { ProductsCategoriesService } from "../products-categories.service";
import { NoResults } from "../../../../shared/components/no-results/models/no-results";
import { rxResource } from "@angular/core/rxjs-interop";

@Component({
	selector: 'app-products-categories-list',
	imports: [
		TableComponent,
		LocalActionsUpdaterComponent
	],
	templateUrl: './products-categories-list.component.html',
	styleUrl: './products-categories-list.component.scss'
})
export class ProductsCategoriesListComponent {
	service = inject(ProductsCategoriesService);

	resource = rxResource({
		loader: () => this.service.getAll()
	});

	noResults: NoResults = {
		label: "Nenhuma categoria adicionada",
		description: "Quando alguma for adicionada ela aparecerá aqui",
		icon: "category"
	}

	getColumns: TableColumnFn<ProductCategory> = element => [
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
	]

	actions: Button[] = [
		{
			type: "flat",
			icon: "add",
			label: "Adicionar categoria",
			tooltip: "Adicionar categoria",
			relativeRoute: `${routeNames.categories}/${routeNames.new}`
		}
	]

	getActions: TableActionsFn<ProductCategory> = element => [
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
			click: () => this.service.delete(element.id).subscribe(() => {
				this.resource.reload();
			})
		},
	];
}