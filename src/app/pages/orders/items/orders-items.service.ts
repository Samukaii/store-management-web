import { inject, Injectable } from '@angular/core';
import { injectParametrizedUrl } from "../../../shared/di/inject-parametrized-url";
import { HttpClient } from "@angular/common/http";
import { OrdersItemsFormValue } from "../models/orders-items-form-value";
import { environment } from "../../../environments/environment";
import { injectParams } from "../../../shared/di/inject-params";
import { OrderItem } from "../models/order-item";
import { Generic } from "../../../shared/models/generic";
import { BaseSelect } from "../../../shared/models/base-select";

@Injectable({
	providedIn: 'root'
})
export class OrdersItemsService {
	http = inject(HttpClient);
	params = injectParams();
	baseUrl = injectParametrizedUrl(`${environment.api}/orders/:id/items`);

	getAll() {
		return this.http.get<OrderItem[]>(this.baseUrl());
	}

	single(id: number) {
		return this.http.get<OrderItem>(`${this.baseUrl()}/${id}`);
	}

	delete(id: number) {
		return this.http.delete(`${this.baseUrl()}/${id}`);
	}

	create(value: OrdersItemsFormValue) {
		return this.http.post<OrderItem>(this.baseUrl(), value);
	}

	autocomplete = (params: Generic) => {
		return this.http.get<BaseSelect[]>(`${environment.api}/order-items/autocomplete`, {
			params: params
		});
	}

	update(id: number, value: OrdersItemsFormValue) {
		return this.http.put<OrderItem>(`${this.baseUrl()}/${id}`, value);
	}
}
