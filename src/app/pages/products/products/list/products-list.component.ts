import { Component, computed, inject, Signal } from '@angular/core';
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
import { DialogService } from "../../../../shared/services/dialog.service";
import { ProductsImportComponent } from "../import/products-import.component";
import { rxResource, toSignal } from "@angular/core/rxjs-interop";
import { ChipsSelectorComponent } from "../../../../shared/components/chips-selector/chips-selector.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ProductsCategoriesService } from "../../categories/products-categories.service";
import { FormValue } from "../../../../shared/models/form-value";
import { ConfirmActionService } from "../../../../core/services/confirm-action.service";

export const formValue = <Form extends FormGroup>(form: Form) => {
	return toSignal(form.valueChanges, {
		initialValue: form.getRawValue()
	}) as Signal<FormValue<Form>>;
}

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
		categoryId: [-2 as null | number]
	});

	filters = formValue(this.filterForm);

	categories = rxResource({
		loader: () => this.categoriesService.getAll()
	});

	categoriesOptions = computed(() => {
		return [
			{
				id: -1,
				name: "Todos os produtos"
			},
			{
				id: -2,
				name: "Sem categoria"
			},
			...this.categories.value() ?? [],
		]
	});

	resource = rxResource({
		request: this.filters,
		loader: ({request: params}) => this.service.getAll(params)
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
								this.resource.reload();
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
			iconColor: 'blue',
			tooltip: "Editar",
			relativeRoute: `${element.id}`
		},
		{
			type: "icon",
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
