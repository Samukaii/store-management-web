import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Preparation } from "./models/preparation";
import { PreparationsFormValue } from "./models/preparations-form-value";

@Injectable({
	providedIn: 'root'
})
export class PreparationsService {
	http = inject(HttpClient);
	baseUrl = `${environment.api}/preparations`;

	getAll() {
		return this.http.get<Preparation[]>(this.baseUrl);
	}

	single(id: number) {
		return this.http.get<Preparation>(`${this.baseUrl}/${id}`);
	}

	delete(id: number) {
		return this.http.delete(`${this.baseUrl}/${id}`);
	}

	create(value: PreparationsFormValue) {
		return this.http.post<Preparation>(this.baseUrl, value);
	}

	autocomplete = (params: {search: string}) => {
		return this.http.get<Preparation[]>(`${this.baseUrl}/autocomplete`, {
			params
		});
	}

	update(id: number, value: Partial<PreparationsFormValue>) {
		return this.http.put<Preparation>(`${this.baseUrl}/${id}`, value);
	}
}
