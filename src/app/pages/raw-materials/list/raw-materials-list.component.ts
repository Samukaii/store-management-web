import { Component, inject } from '@angular/core';
import {
	LocalActionsUpdaterComponent
} from "../../../shared/components/local-actions/updater/local-actions-updater.component";
import { TableComponent } from "../../../shared/components/table/table.component";
import { RawMaterial } from "../models/raw-material";
import { Button } from "../../../shared/components/button/models/button";
import { routeNames } from "../../../shared/route-names";
import { TableColumnFn } from "../../../shared/components/table/table-column-fn";
import { TableActionsFn } from "../../../shared/components/table/table-actions-fn";
import { RawMaterialsService } from "../raw-materials.service";
import { NoResults } from "../../../shared/components/no-results/models/no-results";
import { rxResource } from "@angular/core/rxjs-interop";

@Component({
	selector: 'app-raw-materials-list',
	imports: [
		TableComponent,
		LocalActionsUpdaterComponent
	],
	templateUrl: './raw-materials-list.component.html',
	styleUrl: './raw-materials-list.component.scss'
})
export class RawMaterialsListComponent {
	service = inject(RawMaterialsService);

	resource = rxResource({
		loader: () => this.service.getAll()
	});

	noResults: NoResults = {
		label: "Nenhum insumo adicionado",
		description: "Quando algum for adicionado ele aparecerá aqui",
		icon: "restaurant"
	}

	getColumns: TableColumnFn<RawMaterial> = element => [
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
			label: "Preço por unidade",
			value: this.calculateCost(element)
		},
	]

	actions: Button[] = [
		{
			type: "flat",
			icon: "add",
			label: "Adicionar insumo",
			tooltip: "Adicionar insumo",
			relativeRoute: `${routeNames.rawMaterials}/${routeNames.new}`
		}
	]

	getActions: TableActionsFn<RawMaterial> = element => [
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

	calculateCost(foodInput: RawMaterial) {
		return `R$ ${foodInput.costPerUnit.toFixed(2)} por ${foodInput.measurementUnit.name.toLowerCase()}`;
	}
}
