import { Component, inject, input, output } from '@angular/core';
import {
	LocalActionsUpdaterComponent
} from "../../../../shared/components/local-actions/updater/local-actions-updater.component";
import { TableComponent } from "../../../../shared/components/table/table.component";
import { ProductsService } from "../products.service";
import { TableColumnFn } from "../../../../shared/components/table/table-column-fn";
import { Product } from "../models/product";
import { Button } from "../../../../shared/components/button/models/button";
import { TableActionsFn } from "../../../../shared/components/table/table-actions-fn";
import { ProductsIngredientsService } from "./products-ingredients.service";
import { DialogService } from "../../../../shared/services/dialog.service";
import { ProductsIngredientsCreatorComponent } from "./creator/products-ingredients-creator.component";
import { NoResults } from "../../../../shared/components/no-results/models/no-results";
import { ProductFoodInput } from "../models/product-food-input";
import { of } from "rxjs";
import { ProductsDefinePriceComponent } from "../define-price/products-define-price.component";
import { rxResource } from "@angular/core/rxjs-interop";
import { RawMaterialsMeasurementUnit } from "../../../raw-materials/enums/raw-materials-measurement-unit";
import { ConfirmActionService } from "../../../../core/services/confirm-action/confirm-action.service";

@Component({
	selector: 'app-products-ingredients',
	imports: [
		LocalActionsUpdaterComponent,
		TableComponent
	],
	templateUrl: './products-ingredients.component.html',
	styleUrl: './products-ingredients.component.scss'
})
export class ProductsIngredientsComponent {
	service = inject(ProductsIngredientsService);
	productsService = inject(ProductsService);
	confirm = inject(ConfirmActionService);
	dialog = inject(DialogService);
	product = input<Product>();
	requestUpdate = output();

	resource = rxResource({
		request: () => ({productId: this.product()?.id}),
		loader: ({request: {productId}}) => {
			if (!productId) return of<ProductFoodInput[]>([]);
			return this.service.getAll()
		}
	});

	noResults: NoResults = {
		label: "Nenhum insumo adicionado",
		description: "Quando algum for adicionado ele aparecerá aqui",
		icon: "restaurant"
	}

	getColumns: TableColumnFn<ProductFoodInput> = element => [
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
			position: "cost",
			label: "Custo",
			value: `R$ ${element.totalCost.toFixed(2)}`
		},
		{
			position: "quantity",
			label: "Quantidade",
			value: `${element.quantity} ${element.measurementUnit.name}`
		},
	]

	actions: Button[] = [
		{
			type: "stroked",
			label: "Definir preço",
			click: () => {
				this.dialog.open({
					component: ProductsDefinePriceComponent,
					data: {
						product: this.product()!,
						formSubmit: (value) => {
							this.productsService.definePrice(this.product()!.id, value).subscribe(() => {
								this.resource.reload();
								this.dialog.closeAll();
								this.requestUpdate.emit();
							})
						}
					},
					config: {
						minWidth: "fit-content",
					}
				})
			}
		},
		{
			type: "flat",
			label: "Adicionar ingrediente",
			click: () => {
				this.dialog.open({
					component: ProductsIngredientsCreatorComponent,
					data: {
						product: this.product()!,
						formSubmit: (value) => {
							this.service.create(value).subscribe(() => {
								this.dialog.close(ProductsIngredientsCreatorComponent);
								this.requestUpdate.emit();
							})
						}
					},
					config: {
						minWidth: "900px",

					}
				})
			}
		},
	]

	getActions: TableActionsFn<ProductFoodInput> = element => [
		{
			type: "icon",
			icon: "delete",
			iconColor: "red",
			tooltip: "Remover",
			click: () => this.confirm.confirm({
				title: "Excluir ingrediente",
				description: "Você tem certeza de que deseja excluir este ingrediente?",
				actions: {
					primary: {
						click: () => {
							this.service.delete(element.id).subscribe(() => {
								this.requestUpdate.emit();
							})
						}
					}
				}
			})
		},
	];

	getQuantity(preparation: ProductFoodInput) {
		const value = preparation.quantity < 1 ? preparation.quantity * 1000 : preparation.quantity;

		return `${value} ${this.getLabel(preparation)}`;
	}

	getLabel(preparation: ProductFoodInput) {
		switch (preparation.measurementUnit.id) {
			case RawMaterialsMeasurementUnit.KILOGRAMS:
				return preparation.quantity < 1 ? 'g' : 'kg';
			case RawMaterialsMeasurementUnit.LITER:
				return preparation.quantity < 1 ? 'ml' : 'L';
			default:
				return 'unidade'
		}
	}
}
