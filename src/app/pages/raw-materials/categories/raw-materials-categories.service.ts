import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/app/environments/environment";
import { RawMaterialCategory } from "./models/raw-material-category";
import { RawMaterialsCategoriesFormValue } from "./models/raw-materials-categories-form-value";
import { Generic } from "src/app/shared/models/generic";

@Injectable({
	providedIn: 'root'
})
export class RawMaterialsCategoriesService {
	http = inject(HttpClient);
	baseUrl = `${environment.api}/raw_materials/categories`;

	getAll(params: Generic = {}) {
		return this.http.get<RawMaterialCategory[]>(this.baseUrl, {params});
	}

	single(id: number) {
		return this.http.get<RawMaterialCategory>(`${this.baseUrl}/${id}`);
	}

	delete(id: number) {
		return this.http.delete(`${this.baseUrl}/${id}`);
	}

	create(value: RawMaterialsCategoriesFormValue) {
		return this.http.post<RawMaterialCategory>(this.baseUrl, value);
	}

	update(id: number, value: RawMaterialsCategoriesFormValue) {
		return this.http.put(`${this.baseUrl}/${id}`, value);
	}

	autocomplete = (params: Generic) => {
		return this.http.get<RawMaterialCategory[]>(`${this.baseUrl}/autocomplete`, {
			params
		});
	}
}
