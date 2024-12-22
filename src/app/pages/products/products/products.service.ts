import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { Product } from "./models/product";
import { ProductsFormValue } from "./models/products-form-value";
import { ProductsDefinePricePayload } from "./define-price/create-products-define-price.form";
import { Generic } from "../../../shared/models/generic";
import { of } from "rxjs";
import { AutocompleteOption } from "../../../shared/components/autocomplete/models/autocomplete-option";
import { applyToAllObjects } from "./list/products-list.component.spec";

@Injectable({
	providedIn: 'root'
})
export class ProductsService {
	// http = inject(HttpClient);
	baseUrl = `${environment.api}/products`;

	getAll(params: Generic = {}) {
		let result = [
			{
				id: 1,
				name: "Cheeseburger"
			},
			{
				id: 2,
				name: "French Fries"
			},
			{
				id: 3,
				name: "Milkshake"
			},
			{
				id: 4,
				name: "Chicken Nuggets"
			},
			{
				id: 5,
				name: "Hot Dog"
			}
		] as Product[];

		if (params['sortProperty'] && params['sortDirection']) {
			result = result.sort((prev, curr) => {
				const sortProperty = params['sortProperty'] as keyof typeof prev;
				const direction = params['sortDirection'] as 'asc' | 'desc';

				if (prev[sortProperty]===curr[sortProperty])
					return 0;

				if (direction==='desc')
					return prev[sortProperty] < curr[sortProperty] ? 1:-1;

				if (direction==='asc')
					return prev[sortProperty] > curr[sortProperty] ? 1:-1;

				return 0;
			});
		}

		if (params['category.id:equal']) {
			result = [
				{
					id: 1,
					name: "Cheeseburger"
				},
				{
					id: 4,
					name: "Chicken Nuggets"
				},
				{
					id: 5,
					name: "Hot Dog"
				}
			] as Product[];
		}

		return of(applyToAllObjects(result, {
			price: 0,
			profit: 0,
			profitMargin: 0,
		}))
	}

	autocomplete = (params: Generic = {}) => {
		return of([
			{
				id: 1,
				name: "Cheeseburger"
			},
			{
				id: 2,
				name: "French Fries"
			},
			{
				id: 3,
				name: "Milkshake"
			},
			{
				id: 4,
				name: "Chicken Nuggets"
			},
			{
				id: 5,
				name: "Hot Dog"
			}
		] as AutocompleteOption[])
	}

	single(id: number) {
		return of({
			id: 1,
			name: "Cheeseburger"
		} as Product)
	}

	delete(id: number) {
		return of({});
	}

	create(value: ProductsFormValue) {
		return of({
			id: 1,
			name: "Cheeseburger"
		} as Product);
	}

	update(id: number, value: ProductsFormValue) {
		return of({
			id: 1,
			name: "Cheeseburger"
		} as Product);
	}

	definePrice(id: number, value: ProductsDefinePricePayload) {
		return of({
			id: 1,
			name: "Cheeseburger"
		} as Product);
	}
}
