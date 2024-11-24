import { inject, Injectable } from '@angular/core';
import { injectParametrizedUrl } from "../../../shared/di/inject-parametrized-url";
import { HttpClient } from "@angular/common/http";
import { PreparationsIngredientsFormValue } from "../models/preparations-ingredients-form-value";
import { environment } from "../../../environments/environment";
import { injectParams } from "../../../shared/di/inject-params";
import { PreparationIngredient } from "../models/preparation-ingredient";

@Injectable({
	providedIn: 'root'
})
export class PreparationsIngredientsService {
	http = inject(HttpClient);
	params = injectParams();
	baseUrl = injectParametrizedUrl(`${environment.api}/preparations/:id/ingredients`);

	getAll() {
		return this.http.get<PreparationIngredient[]>(this.baseUrl());
	}

	single(id: number) {
		return this.http.get<PreparationIngredient>(`${this.baseUrl()}/${id}`);
	}

	delete(id: number) {
		return this.http.delete(`${this.baseUrl()}/${id}`);
	}

	create(value: PreparationsIngredientsFormValue) {
		return this.http.post<PreparationIngredient>(this.baseUrl(), value);
	}

	update(id: number, value: PreparationsIngredientsFormValue) {
		return this.http.put<PreparationIngredient>(`${this.baseUrl()}/${id}`, value);
	}
}
