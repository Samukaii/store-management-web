import { Component, inject } from '@angular/core';
import {
	LocalActionsUpdaterComponent
} from "../../../shared/components/local-actions/updater/local-actions-updater.component";
import { TableComponent } from "../../../shared/components/table/table.component";
import { Preparation } from "../models/preparation";
import { Button } from "../../../shared/components/button/models/button";
import { routeNames } from "../../../shared/route-names";
import { TableColumnFn } from "../../../shared/components/table/table-column-fn";
import { TableActionsFn } from "../../../shared/components/table/table-actions-fn";
import { PreparationsService } from "../preparations.service";
import { NoResults } from "../../../shared/components/no-results/models/no-results";
import { DialogService } from "../../../shared/services/dialog.service";
import { rxResource } from "@angular/core/rxjs-interop";
import { RawMaterialsMeasurementUnit } from "../../raw-materials/enums/raw-materials-measurement-unit";
import { ConfirmActionService } from "../../../shared/components/confirm-action/confirm-action.service";

@Component({
	selector: 'app-preparations-list',
	imports: [
		TableComponent,
		LocalActionsUpdaterComponent
	],
	templateUrl: './preparations-list.component.html',
	styleUrl: './preparations-list.component.scss'
})
export class PreparationsListComponent {
	service = inject(PreparationsService);
	dialog = inject(DialogService);
	confirm = inject(ConfirmActionService);

	resource = rxResource({
		loader: () => this.service.getAll()
	});

	noResults: NoResults = {
		label: "Nenhum preparo adicionado",
		description: "Quando algum for adicionado ele aparecerá aqui",
		icon: "blender"
	}

	getColumns: TableColumnFn<Preparation> = element => [
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
			position: "totalCost",
			label: "Custo total",
			value: `R$ ${element.totalCost.toFixed(2)}`
		},
		{
			position: "quantity",
			label: "Rendimento",
			value: this.getQuantity(element)
		},
	]

	actions: Button[] = [
		{
			type: "flat",
			label: "Adicionar preparo",
			relativeRoute: `${routeNames.preparations}/${routeNames.new}`
		}
	]

	getActions: TableActionsFn<Preparation> = element => [
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
				title: "Excluir preparo",
				description: "Você tem certeza de que deseja excluir este preparo?",
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

	getQuantity(preparation: Preparation) {
		const value = preparation.quantity < 1 ? preparation.quantity * 1000 : preparation.quantity;

		return `${value} ${this.getLabel(preparation)}`;
	}

	getLabel(preparation: Preparation) {
		switch (preparation.measurementUnit.id) {
			case RawMaterialsMeasurementUnit.KILOGRAMS:
				return preparation.quantity < 1 ? 'g' : 'kg';
			case RawMaterialsMeasurementUnit.LITER:
				return preparation.quantity < 1 ? 'g' : 'kg';
			default:
				return 'unidade'
		}
	}
}
