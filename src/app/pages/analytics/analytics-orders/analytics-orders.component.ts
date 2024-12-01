import { Component, computed, inject } from '@angular/core';
import { FlexRowComponent } from "../../../shared/components/flex-row/flex-row.component";
import { LineChartComponent } from "../../../shared/components/charts/line/line-chart.component";
import { AnalyticsService } from "../analytics.service";
import { FormBuilder } from "@angular/forms";
import { extendedDate } from "../../../shared/helpers/extended-date";
import { rxResource } from "@angular/core/rxjs-interop";
import { formatDate } from "@angular/common";
import { WindowLoadingComponent } from "../../../core/components/window-loading/window-loading.component";
import { OrdersDisplayType } from "../enum/orders-display-type";
import { DateRangeComponent } from "../../../shared/components/date-range/date-range.component";
import { FormRadioComponent } from "../../../shared/components/form/radio/form-radio.component";
import { BasicOption } from "../../../shared/models/basic-option";
import { formValue } from "../../../shared/helpers/form-value";
import { distinctPropertiesAvoidingNull } from "../../../shared/helpers/distinct-properties-avoiding-null";
import { distinctValue } from "../../../shared/helpers/distinct-value";
import { BarChartComponent } from "../../../shared/components/charts/bar/bar-chart.component";
import { DatePickerComponent } from "../../../shared/components/date-picker/date-picker.component";
import { YearFormatDirective } from "../../../shared/directives/year-format/year-format.directive";
import { capitalize } from "../../../shared/helpers/capitalize";

const fillPeriodWithDates = (start: Date | string, end: Date | string) => {
	let current = new Date(start);
	const dates = [];

	while (current.getTime() < new Date(end).getTime()) {
		dates.push(new Date(current));
		current.setDate(current.getDate() + 1);
	}

	return dates;
}

const fillPeriodWithMonths = (start: Date | string, end: Date | string) => {
	let current = new Date(start);
	const dates = [];

	while (current.getMonth() <= new Date(end).getMonth() && current.getFullYear() <= new Date(end).getFullYear()) {
		dates.push(new Date(current));
		current.setMonth(current.getMonth() + 1);
	}

	return dates;
}

@Component({
	selector: 'app-analytics-orders',
	imports: [
		FlexRowComponent,
		LineChartComponent,
		WindowLoadingComponent,
		DateRangeComponent,
		FormRadioComponent,
		BarChartComponent,
		DatePickerComponent,
		YearFormatDirective
	],
	templateUrl: './analytics-orders.component.html',
	styleUrls: ['./analytics-orders.component.scss', '../analytics.component.scss']
})
export class AnalyticsOrdersComponent {
	service = inject(AnalyticsService);
	protected readonly OrdersDisplayType = OrdersDisplayType;

	form = inject(FormBuilder).group({
		periodType: [OrdersDisplayType.DAY],
		startDate: [extendedDate().minus(1, 'month').get()],
		endDate: [extendedDate().get()],
	});

	options: BasicOption[] = [
		{
			name: "Dias",
			value: OrdersDisplayType.DAY
		},
		{
			name: "Meses",
			value: OrdersDisplayType.MONTH
		}
	];

	formValue = formValue(this.form);
	period = computed(() => {
		const formValue = this.formValue();

		if (formValue.periodType === OrdersDisplayType.DAY) {
			return {
				'date:min': formValue.startDate?.toISOString() ?? null,
				'date:max': formValue.endDate?.toISOString() ?? null,
			}
		}

		return {
			'date:min': formValue.startDate ? extendedDate(formValue.startDate).firstDayOf('year').getISO() : null,
			'date:max': formValue.startDate ? extendedDate(formValue.startDate).lastDayOf('year').getISO() : null,
		}
	}, {equal: distinctPropertiesAvoidingNull(['date:max', 'date:min'])});

	filters = computed(() => {
		return {
			...this.period(),
			periodType: this.formValue().periodType
		}
	}, {equal: distinctValue})

	orders = rxResource({
		request: this.filters,
		loader: ({request: params}) => this.service.ordersByPeriod(params)
	});

	ordersChartData = computed(() => {
		const orders = this.orders.value() ?? [];
		let data: { label: string; value: number }[] = [];

		if (this.filters().periodType === OrdersDisplayType.DAY) {
			const dates = fillPeriodWithDates(this.period()['date:min']!, this.period()['date:max']!);

			data = dates.map(date => {
				const order = orders.find(order =>
					formatDate(order.date, 'dd/MM/yyyy', 'pt') === formatDate(date, 'dd/MM/yyyy', 'pt')
				);

				return {
					label: formatDate(date, 'dd/MM', 'pt'),
					value: order?.total ?? 0
				}
			})
		}

		if (this.filters().periodType === OrdersDisplayType.MONTH) {
			const dates = fillPeriodWithMonths(
				extendedDate().firstDayOf('year').get(),
				extendedDate().lastDayOf('year').get()
			);

			data = dates.map(date => {
				const order = orders.find(order =>
					formatDate(order.date, 'MM', 'en') === formatDate(date, 'MM', 'pt')
				);

				return {
					label: capitalize(formatDate(date, 'MMMM', 'pt')),
					value: order?.total ?? 0
				}
			})
		}

		return data;
	});

	totalBilling = computed(() => {
		const data = this.ordersChartData().reverse();

		return data.reduce((total, current) => total + current.value, 0);
	});

	billingAverage = computed(() => {
		const data = this.ordersChartData().reverse();

		return (this.totalBilling() ?? 0) / data.length;
	});
}
