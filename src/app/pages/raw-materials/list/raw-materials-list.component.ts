import { Component, computed, inject } from '@angular/core';
import {
	LocalActionsUpdaterComponent
} from "src/app/shared/components/local-actions/updater/local-actions-updater.component";
import { TableComponent } from "src/app/shared/components/table/table.component";
import { RawMaterial } from "../models/raw-material";
import { Button } from "src/app/shared/components/button/models/button";
import { routeNames } from "src/app/shared/route-names";
import { TableColumnFn } from "src/app/shared/components/table/table-column-fn";
import { TableActionsFn } from "src/app/shared/components/table/table-actions-fn";
import { RawMaterialsService } from "../raw-materials.service";
import { NoResults } from "src/app/shared/components/no-results/models/no-results";
import { rxResource } from "@angular/core/rxjs-interop";
import { ChipsSelectorComponent } from "src/app/shared/components/chips-selector/chips-selector.component";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RawMaterialsCategoriesService } from "../categories/raw-materials-categories.service";
import { ConfirmActionService } from "src/app/shared/components/confirm-action/confirm-action.service";
import { formValue } from "src/app/shared/helpers/form-value/form-value";

@Component({
	selector: 'app-raw-materials-list',
	imports: [
		TableComponent,
		LocalActionsUpdaterComponent,
		ChipsSelectorComponent,
		ReactiveFormsModule
	],
	templateUrl: './raw-materials-list.component.html',
	styleUrl: './raw-materials-list.component.scss'
})
export class RawMaterialsListComponent {
	service = inject(RawMaterialsService);
	categoriesService = inject(RawMaterialsCategoriesService);
	confirm = inject(ConfirmActionService);

	filterForm = inject(FormBuilder).group({
		categoryId: [-2 as null | number]
	});

	filters = formValue(this.filterForm);

	categories = rxResource({
		loader: () => this.categoriesService.autocomplete({
			sortProperty: "name",
			sortDirection: "asc",
			'products:hasAssociation': true
		})
	});

	categoriesOptions = computed(() => {
		return [
			{
				id: -1,
				name: "Todos os insumos"
			},
			{
				id: -2,
				name: "Sem categoria"
			},
			...(this.categories.value() ?? []),
		];
	});

	resource = rxResource({
		request: this.filters,
		loader: ({request: params}) => this.service.getAll(params)
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
			click: () => this.confirm.confirm({
				title: "Excluir insumo",
				description: "Você tem certeza de que deseja excluir este insumo?",
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

	calculateCost(foodInput: RawMaterial) {
		return `R$ ${foodInput.costPerUnit.toFixed(2)} por ${foodInput.measurementUnit.name.toLowerCase()}`;
	}
}
