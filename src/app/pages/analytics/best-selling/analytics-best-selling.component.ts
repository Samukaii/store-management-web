import { Component, computed, inject } from '@angular/core';
import { BarChartComponent } from "../../../shared/components/charts/bar/bar-chart.component";
import { DateRangeComponent } from "../../../shared/components/date-range/date-range.component";
import { FlexRowComponent } from "../../../shared/components/flex-row/flex-row.component";
import { FormRadioComponent } from "../../../shared/components/form/radio/form-radio.component";
import { BestSellingDisplayType } from "../enum/best-selling-display-type";
import { rxResource } from "@angular/core/rxjs-interop";
import { distinctPropertiesAvoidingNull } from "../../../shared/helpers/distinct-properties-avoiding-null";
import { NonNullableFormBuilder } from "@angular/forms";
import { extendedDate } from "../../../shared/helpers/extended-date";
import { controlValue } from "../../../shared/helpers/control-value";
import { AnalyticsService } from "../analytics.service";
import { BasicOption } from "../../../shared/models/basic-option";
import { WindowLoadingComponent } from "../../../core/components/window-loading/window-loading.component";
import { OrdersDisplayType } from "../enum/orders-display-type";

@Component({
  selector: 'app-analytics-best-selling',
	imports: [
		BarChartComponent,
		DateRangeComponent,
		FlexRowComponent,
		FormRadioComponent,
		WindowLoadingComponent
	],
  templateUrl: './analytics-best-selling.component.html',
  styleUrls: ['./analytics-best-selling.component.scss', '../analytics.component.scss']
})
export class AnalyticsBestSellingComponent {
	service = inject(AnalyticsService);

	form = inject(NonNullableFormBuilder).group({
		displayType: [BestSellingDisplayType.SALES_QUANTITY as BestSellingDisplayType],
		startDate: [extendedDate().minus(3, 'month').get()],
		endDate: [extendedDate().get()],
	});

	displayType = controlValue(this.form, 'displayType');
	startDate = controlValue(this.form, 'startDate');
	endDate = controlValue(this.form, 'endDate');

	options: BasicOption[] = [
		{
			name: "Quantidade de vendas",
			value: BestSellingDisplayType.SALES_QUANTITY
		},
		{
			name: "Total faturado",
			value: BestSellingDisplayType.TOTAL_BILLED
		},
	]

	label = computed(() => {
		const displayType = this.displayType();

		return this.options.find(option => option.value === displayType)?.name ?? "";
	});

	profitMargin = computed(() => {
		const data = this.products.value() ?? [];

		const totalProfitMargin = data.reduce((item, current) =>
			item + current.profitMargin * current.quantity, 0
		);

		const totalSales = data.reduce((item, current) =>
			item + current.quantity, 0
		);


		return (totalProfitMargin ?? 0) / (totalSales || 1);
	})

	dataProfits = computed(() => {
		return this.products.value()?.map(item => ({profit: item.profitMargin, quantity: item.quantity})) ?? []
	});


	params = computed(() => {
		return {
			'order.date:min': this.startDate(),
			'order.date:max': this.endDate(),
		}
	}, {equal: distinctPropertiesAvoidingNull(['order.date:max', 'order.date:min'])});

	products = rxResource({
		request: this.params,
		loader: ({request}) => this.service.bestSellingProducts(request)
	});

	chartData = computed(() => {
		return this.products.value()?.map(item => {
			return {
				label: item.name,
				value: this.displayType() === BestSellingDisplayType.SALES_QUANTITY
					? item.quantity ?? 0
					: item.total
			}
		}).sort((prev, curr) => curr.value - prev.value) ?? []
	});
	protected readonly OrdersDisplayType = OrdersDisplayType;
}