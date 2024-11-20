import { inject, Injectable } from '@angular/core';
import { injectParametrizedUrl } from "../../../shared/di/inject-parametrized-url";
import { HttpClient } from "@angular/common/http";
import { ProductsIngredientsFormValue } from "../models/products-ingredients-form-value";
import { environment } from "../../../environments/environment";
import { injectParams } from "../../../shared/di/inject-params";
import { ProductFoodInput } from "../models/product-food-input";

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

	create(value: ProductsIngredientsFormValue) {
		return this.http.post<ProductFoodInput>(this.baseUrl(), value);
	}

	update(id: number, value: ProductsIngredientsFormValue) {
		return this.http.put<ProductFoodInput>(`${this.baseUrl()}/${id}`, value);
	}
}
