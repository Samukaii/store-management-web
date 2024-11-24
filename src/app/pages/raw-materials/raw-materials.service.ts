import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { RawMaterial } from "./models/raw-material";
import { RawMaterialsFormValue } from "./models/raw-materials-form-value";

@Injectable({
	providedIn: 'root'
})
export class RawMaterialsService {
	http = inject(HttpClient);
	baseUrl = `${environment.api}/raw_materials`;

	getAll() {
		return this.http.get<RawMaterial[]>(this.baseUrl);
	}

	single(id: number) {
		return this.http.get<RawMaterial>(`${this.baseUrl}/${id}`);
	}

	delete(id: number) {
		return this.http.delete(`${this.baseUrl}/${id}`);
	}

	create(value: RawMaterialsFormValue) {
		return this.http.post<RawMaterial>(this.baseUrl, value);
	}

	update(id: number, value: RawMaterialsFormValue) {
		return this.http.put(`${this.baseUrl}/${id}`, value);
	}

	autocomplete = (params: {search: string}) => {
		return this.http.get<RawMaterial[]>(`${this.baseUrl}/autocomplete`, {
			params
		});
	}
}
