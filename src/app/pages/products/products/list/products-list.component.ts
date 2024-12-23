import { Component, computed, inject } from '@angular/core';
import {
	LocalActionsUpdaterComponent
} from "../../../../shared/components/local-actions/updater/local-actions-updater.component";
import { TableComponent } from "../../../../shared/components/table/table.component";
import { Product } from "../models/product";
import { Button } from "../../../../shared/components/button/models/button";
import { routeNames } from "../../../../shared/route-names";
import { TableColumnFn } from "../../../../shared/components/table/table-column-fn";
import { TableActionsFn } from "../../../../shared/components/table/table-actions-fn";
import { ProductsService } from "../products.service";
import { NoResults } from "../../../../shared/components/no-results/models/no-results";
import { DialogService } from "../../../../shared/services/dialog/dialog.service";
import { rxResource } from "@angular/core/rxjs-interop";
import { ChipsSelectorComponent } from "../../../../shared/components/chips-selector/chips-selector.component";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { ProductsCategoriesService } from "../../categories/products-categories.service";
import { ConfirmActionService } from "../../../../shared/components/confirm-action/confirm-action.service";
import { Generic } from "../../../../shared/models/generic";
import { formValue } from "../../../../shared/helpers/form-value";

@Component({
	selector: 'app-products-list',
	imports: [
		TableComponent,
		LocalActionsUpdaterComponent,
		ChipsSelectorComponent,
		ReactiveFormsModule
	],
	templateUrl: './products-list.component.html',
	styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
	service = inject(ProductsService);
	categoriesService = inject(ProductsCategoriesService);
	dialog = inject(DialogService);
	confirm = inject(ConfirmActionService);

	filterForm = inject(FormBuilder).group({
		categoryId: ['all' as string | number]
	});

	filtersFormValue = formValue(this.filterForm);

	categories = rxResource({
		loader: () => this.categoriesService.autocomplete({
			sortProperty: "name",
			sortDirection: "asc",
			'products:hasAssociation': true
		})
	});

	filter = computed(() => {
		const value = this.filtersFormValue();

		const filter: Generic = {};

		if(typeof value.categoryId === "number") {
			filter['category.id:equal'] = value.categoryId;
		}

		if(value.categoryId === "no-category") {
			filter['category:isNull'] = null;
		}

		if(value.categoryId === "no-costs") {
			filter['ingredients:hasAssociation'] = false;
		}

		return {
			sortProperty: "name",
			sortDirection: "asc",
			...filter
		};
	});

	categoriesOptions = computed(() => {
		return [
			{
				id: 'all',
				name: "Todos os produtos"
			},
			{
				id: 'no-category',
				name: "Sem categoria"
			},
			{
				id: 'no-costs',
				name: "Sem custos"
			},
			...(this.categories.value() ?? []),
		];
	});

	resource = rxResource({
		request: () => this.filter(),
		loader: ({request: params}) => {
			return this.service.getAll(params);
		}
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
			type: "flat",
			name: "add",
			label: "Adicionar produto",
			relativeRoute: `${routeNames.products}/${routeNames.new}`
		}
	]

	getActions: TableActionsFn<Product> = element => [
		{
			type: "icon",
			name: "edit",
			icon: "edit",
			iconColor: 'blue',
			tooltip: "Editar",
			relativeRoute: `${element.id}`
		},
		{
			type: "icon",
			name: "delete",
			icon: "delete",
			iconColor: "red",
			tooltip: "Excluir",
			click: () => this.confirm.confirm({
				title: "Excluir produto",
				description: "Você tem certeza de que deseja excluir este produto?",
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
