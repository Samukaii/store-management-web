import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { ProductCategory } from "./models/product-category";
import { ProductsCategoriesFormValue } from "./models/products-categories-form-value";
import { Generic } from "../../../shared/models/generic";
import { of } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class ProductsCategoriesService {
	// http = inject(HttpClient);
	baseUrl = `${environment.api}/products/categories`;

	getAll(params: Generic = {}) {
		return of([
			{
				id: 1,
				name: "Category 1"
			},
			{
				id: 2,
				name: "Category 2"
			},
			{
				id: 3,
				name: "Category 3"
			},
			{
				id: 4,
				name: "Category 4"
			},
			{
				id: 5,
				name: "Category 5"
			},
		] as ProductCategory[])
	}

	single(id: number) {
		return of(
			{
				id: 1,
				name: "Category 1"
			} as ProductCategory,
		)
	}

	delete(id: number) {
		return of(
			{
				id: 1,
				name: "Category 1"
			} as ProductCategory,
		)
	}

	create(value: ProductsCategoriesFormValue) {
		return of(
			{
				id: 1,
				name: "Category 1"
			} as ProductCategory,
		)
	}

	update(id: number, value: ProductsCategoriesFormValue) {
		return of(
			{
				id: 1,
				name: "Category 1"
			} as ProductCategory,
		)
	}

	autocomplete = (params: Generic) => {
		return of([
			{
				id: 1,
				name: "Category 1"
			},
			{
				id: 2,
				name: "Category 2"
			},
			{
				id: 3,
				name: "Category 3"
			},
			{
				id: 4,
				name: "Category 4"
			},
			{
				id: 5,
				name: "Category 5"
			},
		] as ProductCategory[])
	}
}
