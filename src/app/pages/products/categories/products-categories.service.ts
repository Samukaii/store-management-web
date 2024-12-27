import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/app/environments/environment";
import { ProductCategory } from "./models/product-category";
import { ProductsCategoriesFormValue } from "./models/products-categories-form-value";
import { Generic } from "src/app/shared/models/generic";

@Injectable({
	providedIn: 'root'
})
export class ProductsCategoriesService {
	http = inject(HttpClient);
	baseUrl = `${environment.api}/products/categories`;

	getAll(params: Generic = {}) {
		return this.http.get<ProductCategory[]>(this.baseUrl, {params: params});
	}

	single(id: number) {
		return this.http.get<ProductCategory>(`${this.baseUrl}/${id}`);
	}

	delete(id: number) {
		return this.http.delete(`${this.baseUrl}/${id}`);
	}

	create(value: ProductsCategoriesFormValue) {
		return this.http.post<ProductCategory>(this.baseUrl, value);
	}

	update(id: number, value: ProductsCategoriesFormValue) {
		return this.http.put(`${this.baseUrl}/${id}`, value);
	}

	autocomplete = (params: Generic) => {
		return this.http.get<ProductCategory[]>(`${this.baseUrl}/autocomplete`, {
			params
		});
	}
}
