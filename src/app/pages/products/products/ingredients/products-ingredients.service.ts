import { inject, Injectable } from '@angular/core';
import { injectParametrizedUrl } from "../../../../shared/di/inject-parametrized-url";
import { HttpClient } from "@angular/common/http";
import { ProductsAddIngredientFormValue } from "../models/products-add-ingredient-form-value";
import { injectParams } from "../../../../shared/di/inject-params";
import { ProductFoodInput } from "../models/product-food-input";
import { environment } from "../../../../environments/environment";
import { Generic } from "../../../../shared/models/generic";

@Injectable({
	providedIn: 'root'
})
export class ProductsIngredientsService {
	http = inject(HttpClient);
	params = injectParams();
	baseUrl = injectParametrizedUrl(`${environment.api}/products/:id/ingredients`);

	getAll() {
		return this.http.get<ProductFoodInput[]>(this.baseUrl());
	}

	single(id: number) {
		return this.http.get<ProductFoodInput>(`${this.baseUrl()}/${id}`);
	}

	delete(id: number) {
		return this.http.delete(`${this.baseUrl()}/${id}`);
	}

	create(value: ProductsAddIngredientFormValue) {
		return this.http.post<ProductFoodInput>(this.baseUrl(), value);
	}

	update(id: number, value: ProductsAddIngredientFormValue) {
		return this.http.put<ProductFoodInput>(`${this.baseUrl()}/${id}`, value);
	}

	importIngredients(form: Generic) {
		return this.http.post<ProductFoodInput>(`${this.baseUrl()}/import`, form);
	}
}
