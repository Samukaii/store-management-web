import { Component } from '@angular/core';
import { AnalyticsBestSellingComponent } from "./best-selling/analytics-best-selling.component";
import { AnalyticsOrdersComponent } from "./analytics-orders/analytics-orders.component";

@Component({
	selector: 'app-analytics',
	imports: [
		AnalyticsBestSellingComponent,
		AnalyticsOrdersComponent
	],
	templateUrl: './analytics.component.html',
	styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {

}
