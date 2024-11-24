import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Order } from "../orders/models/order";
import { BestSellingProduct } from "../products/products/models/best-selling-product";

@Injectable({
	providedIn: 'root'
})
export class AnalyticsService {
	http = inject(HttpClient);
	baseUrl = `${environment.api}/analytics`;

	bestSellingProducts(params: {startDate: Date; endDate: Date}) {
		let httpParams = new HttpParams();

		if(params.startDate)
		httpParams = httpParams.append('startDate', params.startDate.toISOString());

		if(params.endDate)
		httpParams = httpParams.append('endDate', params.endDate.toISOString());

		return this.http.get<BestSellingProduct[]>(`${this.baseUrl}/best_selling_products`, {
			params: httpParams
		});
	}

	ordersByPeriod() {
		return this.http.get<Order[]>(`${this.baseUrl}/orders_by_period`);
	}
}
