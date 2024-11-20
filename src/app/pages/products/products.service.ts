import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Product } from "./models/product";
import { ProductsFormValue } from "./models/products-form-value";
import { ProductFoodInput } from "./models/product-food-input";
import { ProductsDefinePricePayload } from "./define-price/create-products-define-price.form";
import { BestSellingProduct } from "./models/best-selling-product";
import { ImportProductsPayload } from "./import/create-products-import.form";

@Injectable({
	providedIn: 'root'
})
export class ProductsService {
	http = inject(HttpClient);
	baseUrl = `${environment.api}/products`;

	getAll() {
		return this.http.get<Product[]>(this.baseUrl);
	}

	single(id: number) {
		return this.http.get<Product>(`${this.baseUrl}/${id}`);
	}

	delete(id: number) {
		return this.http.delete(`${this.baseUrl}/${id}`);
	}

	create(value: ProductsFormValue) {
		return this.http.post<Product>(this.baseUrl, value);
	}

	update(id: number, value: ProductsFormValue) {
		return this.http.put<Product>(`${this.baseUrl}/${id}`, value);
	}

	definePrice(id: number, value: ProductsDefinePricePayload) {
		return this.http.put<ProductFoodInput>(`${this.baseUrl}/${id}`, value);
	}

	bestSelling() {
		return this.http.get<BestSellingProduct[]>(`${this.baseUrl}/best_selling`);
	}

	import(value: ImportProductsPayload) {
		const asFormData = new FormData();

		asFormData.append('file', value.file!);

		return this.http.post(`${this.baseUrl}/import`, asFormData);
	}
}
