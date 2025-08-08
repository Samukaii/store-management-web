import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Order } from "./models/order";
import { Generic } from "../../shared/models/generic";
import { OrdersFormValue } from "src/app/pages/orders/models/orders-form-value";

@Injectable({
	providedIn: 'root'
})
export class OrdersService {
	http = inject(HttpClient);
	baseUrl = `${environment.api}/orders`;

	getAll(params: Generic = {}) {
		return this.http.get<Order[]>(this.baseUrl, {params});
	}

	single(id: number) {
		return this.http.get<Order>(`${this.baseUrl}/${id}`);
	}

	delete(id: number) {
		return this.http.delete<void>(`${this.baseUrl}/${id}`);
	}

	create(value: OrdersFormValue) {
		return this.http.post<Order>(this.baseUrl, value);
	}

	update(id: number, value: OrdersFormValue) {
		return this.http.patch<Order>(`${this.baseUrl}/${id}`, value);
	}
}
