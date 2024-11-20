import { Component, inject, input, output } from '@angular/core';
import {
	LocalActionsUpdaterComponent
} from "../../../shared/components/local-actions/updater/local-actions-updater.component";
import { TableComponent } from "../../../shared/components/table/table.component";
import { ProductsService } from "../products.service";
import { TableColumnFn } from "../../../shared/components/table/table-column-fn";
import { Product } from "../models/product";
import { Button } from "../../../shared/components/button/models/button";
import { TableActionsFn } from "../../../shared/components/table/table-actions-fn";
import { ProductsIngredientsService } from "./products-ingredients.service";
import { DialogService } from "../../../shared/services/dialog.service";
import { ProductsIngredientsCreatorComponent } from "./creator/products-ingredients-creator.component";
import { NoResults } from "../../../shared/components/no-results/models/no-results";
import { ProductFoodInput } from "../models/product-food-input";
import { FoodInputMeasurementUnit } from "../../food-inputs/enums/food-input-measurement-unit";
import { of } from "rxjs";
import { ProductsDefinePriceComponent } from "../define-price/products-define-price.component";
import { rxResource } from "@angular/core/rxjs-interop";

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
	dialog = inject(DialogService);
	product = input<Product>();
	requestUpdate = output();

	resource = rxResource({
		request: () => ({productId: this.product()?.id}),
		loader: ({request: {productId}}) => {
			if(!productId) return of<ProductFoodInput[]>([]);
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
			value: element.foodInput.name
		},
		{
			position: "cost",
			label: "Custo",
			value: `R$ ${element.totalCost.toFixed(2)}`
		},
		{
			position: "quantity",
			label: "Quantidade",
			value: this.calculateQuantity(element)
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
					}
				})
			}
		},
		{
			type: "flat",
			label: "Adicionar insumo",
			click: () => {
				this.dialog.open({
					component: ProductsIngredientsCreatorComponent,
					data: {
						formSubmit: (value) => {
							this.service.create(value).subscribe(() => {
								this.resource.reload();
								this.dialog.close(ProductsIngredientsCreatorComponent);
								this.requestUpdate.emit();
							})
						}
					},
					config: {
						minWidth: "900px"
					}
				})
			}
		},
	]

	getActions: TableActionsFn<ProductFoodInput> = element => [
		{
			type: "icon",
			icon: "delete",
			tooltip: "Remover",
			click: () => this.service.delete(element.id).subscribe(() => {
				this.resource.reload();
				this.requestUpdate.emit();
			})
		},
	];

	private calculateQuantity(productFoodInput: ProductFoodInput) {
		const {quantity, measurementUnit} = productFoodInput;

		if(measurementUnit.id === FoodInputMeasurementUnit.GRAMS && quantity >= 1000)
			return `${(quantity/1000).toString().replace('.', ',')} Kg`;

		return `${quantity} ${measurementUnit.name}`;
	}
}
