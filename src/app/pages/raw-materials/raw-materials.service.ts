import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { RawMaterial } from "./models/raw-material";
import { RawMaterialsFormValue } from "./models/raw-materials-form-value";
import { Generic } from "../../shared/models/generic";

@Injectable({
	providedIn: 'root'
})
export class RawMaterialsService {
	http = inject(HttpClient);
	baseUrl = `${environment.api}/raw_materials`;

	getAll(params: Generic = {}) {
		const paramsToSend: Generic = {
			'category.id:equal': params['categoryId']
		};

		if(paramsToSend['category.id:equal'] === -1) {
			delete paramsToSend['category.id:equal'];
		}

		if(paramsToSend['category.id:equal'] === -2) {
			delete paramsToSend['category.id:equal'];
			paramsToSend['category:isNull'] = null;
		}


		return this.http.get<RawMaterial[]>(this.baseUrl, {
			params: paramsToSend
		});
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

	autocomplete = (params: Generic) => {
		return this.http.get<RawMaterial[]>(`${this.baseUrl}/autocomplete`, {
			params
		});
	}
}
