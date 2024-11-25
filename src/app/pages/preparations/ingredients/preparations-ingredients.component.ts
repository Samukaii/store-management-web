import { Component, inject, input, output } from '@angular/core';
import {
	LocalActionsUpdaterComponent
} from "../../../shared/components/local-actions/updater/local-actions-updater.component";
import { TableComponent } from "../../../shared/components/table/table.component";
import { PreparationsService } from "../preparations.service";
import { TableColumnFn } from "../../../shared/components/table/table-column-fn";
import { Preparation } from "../models/preparation";
import { Button } from "../../../shared/components/button/models/button";
import { TableActionsFn } from "../../../shared/components/table/table-actions-fn";
import { PreparationsIngredientsService } from "./preparations-ingredients.service";
import { DialogService } from "../../../shared/services/dialog.service";
import { PreparationsIngredientsCreatorComponent } from "./creator/preparations-ingredients-creator.component";
import { NoResults } from "../../../shared/components/no-results/models/no-results";
import { of } from "rxjs";
import { rxResource } from "@angular/core/rxjs-interop";
import { PreparationIngredient } from "../models/preparation-ingredient";
import { PreparationsDefineQuantityComponent } from "../define-quantity/preparations-define-quantity.component";
import { ConfirmActionService } from "../../../core/services/confirm-action.service";

@Component({
    selector: 'app-preparations-ingredients',
    imports: [
        LocalActionsUpdaterComponent,
        TableComponent
    ],
    templateUrl: './preparations-ingredients.component.html',
    styleUrl: './preparations-ingredients.component.scss'
})
export class ProductsIngredientsComponent {
	service = inject(PreparationsIngredientsService);
	preparationsService = inject(PreparationsService);
	dialog = inject(DialogService);
	confirm = inject(ConfirmActionService);
	preparation = input<Preparation>();
	requestUpdate = output();

	resource = rxResource({
		request: () => ({productId: this.preparation()?.id}),
		loader: ({request: {productId}}) => {
			if(!productId) return of<PreparationIngredient[]>([]);
			return this.service.getAll()
		}
	});

	noResults: NoResults = {
		label: "Nenhum preparo adicionado",
		description: "Quando algum for adicionado ele aparecerá aqui",
		icon: "restaurant"
	}

	getColumns: TableColumnFn<PreparationIngredient> = element => [
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
			value: this.calculateQuantity(element)
		},
	]

	actions: Button[] = [
		{
			type: "stroked",
			label: "Definir rendimento",
			click: () => {
				this.dialog.open({
					component: PreparationsDefineQuantityComponent,
					data: {
						preparation: this.preparation()!,
						formSubmit: (value) => {
							this.preparationsService.update(this.preparation()!.id, value).subscribe(() => {
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
			label: "Adicionar ingrediente",
			click: () => {
				this.dialog.open({
					component: PreparationsIngredientsCreatorComponent,
					data: {
						title: "Adicionar ingrediente",
						formSubmit: (value) => {
							this.service.create(value).subscribe(() => {
								this.resource.reload();
								this.dialog.close(PreparationsIngredientsCreatorComponent);
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

	getActions: TableActionsFn<PreparationIngredient> = element => [
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
								this.resource.reload();
								this.requestUpdate.emit();
							})
						}
					}
				}
			})
		},
	];

	private calculateQuantity(ingredient: PreparationIngredient) {
		const {quantity, measurementUnit} = ingredient;

		return `${quantity} ${measurementUnit.name}`;
	}
}
