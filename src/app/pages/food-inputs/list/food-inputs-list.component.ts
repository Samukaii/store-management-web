import { Component, inject } from '@angular/core';
import {
	LocalActionsUpdaterComponent
} from "../../../shared/components/local-actions/updater/local-actions-updater.component";
import { TableComponent } from "../../../shared/components/table/table.component";
import { FoodInput } from "../models/food-input";
import { Button } from "../../../shared/components/button/models/button";
import { routeNames } from "../../../shared/route-names";
import { TableColumnFn } from "../../../shared/components/table/table-column-fn";
import { TableActionsFn } from "../../../shared/components/table/table-actions-fn";
import { FoodInputsService } from "../food-inputs.service";
import { resource } from "../../../shared/signals/resource";
import { NoResults } from "../../../shared/components/no-results/models/no-results";
import { FoodInputMeasurementUnit } from "../enums/food-input-measurement-unit";

@Component({
    selector: 'app-food-inputs-list',
    imports: [
        TableComponent,
        LocalActionsUpdaterComponent
    ],
    templateUrl: './food-inputs-list.component.html',
    styleUrl: './food-inputs-list.component.scss'
})
export class FoodInputsListComponent {
	service = inject(FoodInputsService);

	resource = resource({
		initialValue: [],
		loader: () => this.service.getAll()
	});

	noResults: NoResults = {
		label: "Nenhum insumo adicionado",
		description: "Quando algum for adicionado ele aparecerá aqui",
		icon: "restaurant"
	}

	getColumns: TableColumnFn<FoodInput> = element => [
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
			relativeRoute: `${routeNames.foodInputs}/${routeNames.new}`
		}
	]

	getActions: TableActionsFn<FoodInput> = element => [
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
	];

	calculateCost(foodInput: FoodInput) {
		if(foodInput.measurementUnit.id === FoodInputMeasurementUnit.UNIT)
			return `R$ ${foodInput.costPerUnit.toFixed(2)} por ${foodInput.measurementUnit.name}`;

		if(foodInput.measurementUnit.id === FoodInputMeasurementUnit.GRAMS)
			return `R$ ${(foodInput.costPerUnit * 1000).toFixed(2)} por Kg`;

		return "";
	}
}
