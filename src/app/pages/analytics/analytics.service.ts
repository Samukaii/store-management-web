import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Order } from "../orders/models/order";
import { BestSellingProduct } from "../products/products/models/best-selling-product";
import { Generic } from "../../shared/models/generic";
import { toDateOrNull } from "../../shared/helpers/to-date-or-null";

@Injectable({
	providedIn: 'root'
})
export class AnalyticsService {
	http = inject(HttpClient);
	baseUrl = `${environment.api}/analytics`;

	bestSellingProducts(params: Generic) {
		let httpParams = new HttpParams();

		Object.keys(params).forEach(key => {
			const value = toDateOrNull(params[key]);

			if (!value) return;

			httpParams = httpParams.append(key, value.toISOString());
		});

		return this.http.get<BestSellingProduct[]>(`${this.baseUrl}/best_selling_products`, {
			params: httpParams
		});
	}

	ordersByPeriod(params: Generic) {
		return this.http.get<Order[]>(`${this.baseUrl}/orders_by_period`, {params});
	}
}
