import { Component, inject } from '@angular/core';
import {
	LocalActionsUpdaterComponent
} from "src/app/shared/components/local-actions/updater/local-actions-updater.component";
import { TableComponent } from "src/app/shared/components/table/table.component";
import { RawMaterialCategory } from "../models/raw-material-category";
import { Button } from "src/app/shared/components/button/models/button";
import { routeNames } from "src/app/shared/route-names";
import { TableColumnFn } from "src/app/shared/components/table/table-column-fn";
import { TableActionsFn } from "src/app/shared/components/table/table-actions-fn";
import { RawMaterialsCategoriesService } from "../raw-materials-categories.service";
import { NoResults } from "src/app/shared/components/no-results/models/no-results";
import { rxResource } from "@angular/core/rxjs-interop";
import { ConfirmActionService } from "src/app/shared/components/confirm-action/confirm-action.service";

@Component({
	selector: 'app-raw-materials-categories-list',
	imports: [
		TableComponent,
		LocalActionsUpdaterComponent
	],
	templateUrl: './raw-materials-categories-list.component.html',
	styleUrl: './raw-materials-categories-list.component.scss'
})
export class RawMaterialsCategoriesListComponent {
	service = inject(RawMaterialsCategoriesService);
	confirm = inject(ConfirmActionService);

	resource = rxResource({
		loader: () => this.service.getAll()
	});

	noResults: NoResults = {
		label: "Nenhuma categoria adicionada",
		description: "Quando alguma for adicionada ela aparecerá aqui",
		icon: "category"
	}

	getColumns: TableColumnFn<RawMaterialCategory> = element => [
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
			relativeRoute: `${routeNames.rawMaterialsCategories}/${routeNames.new}`
		}
	]

	getActions: TableActionsFn<RawMaterialCategory> = element => [
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
				title: "Excluir categoria",
				description: "Você tem certeza de que deseja excluir esta categoria?",
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
	];
}
