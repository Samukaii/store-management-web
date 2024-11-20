import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { FoodInput } from "./models/food-input";
import { FoodInputsFormValue } from "./models/food-inputs-form-value";

@Injectable({
	providedIn: 'root'
})
export class FoodInputsService {
	http = inject(HttpClient);
	baseUrl = `${environment.api}/food-inputs`;

	getAll() {
		return this.http.get<FoodInput[]>(this.baseUrl);
	}

	single(id: number) {
		return this.http.get<FoodInput>(`${this.baseUrl}/${id}`);
	}

	delete(id: number) {
		return this.http.delete(`${this.baseUrl}/${id}`);
	}

	create(value: FoodInputsFormValue) {
		return this.http.post(this.baseUrl, value);
	}

	update(id: number, value: FoodInputsFormValue) {
		return this.http.put(`${this.baseUrl}/${id}`, value);
	}

	autocomplete = (params: {search: string}) => {
		return this.http.get<FoodInput[]>(`${this.baseUrl}/autocomplete`, {
			params
		});
	}
}
