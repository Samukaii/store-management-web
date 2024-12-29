import { Component, computed, inject, untracked } from '@angular/core';
import { FlexRowComponent } from "src/app/shared/components/flex-row/flex-row.component";
import { LineChartComponent } from "src/app/shared/components/charts/line/line-chart.component";
import { AnalyticsService } from "../analytics.service";
import { FormBuilder } from "@angular/forms";
import { extendedDate } from "src/app/shared/helpers/extended-date/extended-date";
import { rxResource } from "@angular/core/rxjs-interop";
import { formatDate } from "@angular/common";
import { WindowLoadingComponent } from "src/app/core/components/window-loading/window-loading.component";
import { OrdersDisplayType } from "../enum/orders-display-type";
import { DateRangeComponent } from "src/app/shared/components/date-range/date-range.component";
import { FormRadioComponent } from "src/app/shared/components/form/radio/form-radio.component";
import { BasicOption } from "src/app/shared/models/basic-option";
import { formValue } from "src/app/shared/helpers/form-value/form-value";
import {
	distinctPropertiesAvoidingNull
} from "src/app/shared/helpers/distinct-properties-avoiding-null/distinct-properties-avoiding-null";
import { distinctValue } from "src/app/shared/helpers/distinct-value/distinct-value";
import { BarChartComponent } from "src/app/shared/components/charts/bar/bar-chart.component";
import { DatePickerComponent } from "src/app/shared/components/date-picker/date-picker.component";
import { YearFormatDirective } from "src/app/shared/directives/year-format/year-format.directive";
import { capitalize } from "src/app/shared/helpers/capitalize/capitalize";
import { ChartData } from "chart.js/auto";
import { ScriptableContext } from "chart.js";
import { OrdersPeriodType } from "../enum/orders-period-type";
import { bluePalette } from "src/app/shared/components/charts/palettes/blue-palette";

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
	let last = new Date(end);

	current.setDate(1);
	current.setHours(12, 0,  0, 0);
	last.setMonth(last.getMonth() + 1);
	last.setDate(0);
	last.setHours(12, 0,  0, 0);

	const dates = [];

	while (current.getTime() <= last.getTime()) {
		dates.push(new Date(current));
		current.setMonth(current.getMonth() + 1);
	}

	return dates;
}

const monthsSince = (date: Date | string) => {
	const sinceDate = new Date(date);
	const now = new Date();

	sinceDate.setDate(15);
	sinceDate.setHours(12, 0,   0, 0);

	now.setDate(15);
	now.setHours(12, 0,   0, 0);

	let count = 0;

	while (sinceDate.getTime() < now.getTime()) {
		count++;
		sinceDate.setMonth(sinceDate.getMonth() + 1);
	}

	return count;
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
	protected readonly OrdersPeriodType = OrdersPeriodType;

	form = inject(FormBuilder).group({
		periodType: [OrdersPeriodType.DAY],
		displayType: [OrdersDisplayType.BILLING],
		startDate: [extendedDate().minus(1, 'month')],
		endDate: [extendedDate()],
	});

	displayOptions: BasicOption[] = [
		{
			name: "Faturamento",
			value: OrdersDisplayType.BILLING
		},
		{
			name: "Quantidade de vendas",
			value: OrdersDisplayType.QUANTITY
		}
	];

	options: BasicOption[] = [
		{
			name: "Dias",
			value: OrdersPeriodType.DAY
		},
		{
			name: "Meses",
			value: OrdersPeriodType.MONTH
		}
	];

	formValue = formValue(this.form);
	period = computed(() => {
		const formValue = this.formValue();

		if (formValue.periodType === OrdersPeriodType.DAY) {
			return {
				'date:min': formValue.startDate?.toISOString() ?? null,
				'date:max': formValue.endDate?.toISOString() ?? null,
			}
		}

		return {
			'date:min': formValue.startDate ? extendedDate("2024-07-01T12:00:00").toISOString() : null,
			'date:max': formValue.startDate ? extendedDate("2024-07-01T12:00:00").plus(12, 'month').toISOString() : null,
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

	ordersChartItems = computed(() => {
		const orders = this.orders.value() ?? [];
		const displayType = this.formValue().displayType;
		let data: { label: string; value: number }[] = [];

		if (this.filters().periodType === OrdersPeriodType.DAY) {
			const dates = fillPeriodWithDates(this.period()['date:min']!, this.period()['date:max']!);

			data = dates.map(date => {
				const order = orders.find(order =>
					formatDate(order.date, 'dd/MM/yyyy', 'pt') === formatDate(date, 'dd/MM/yyyy', 'pt')
				);

				return {
					label: formatDate(date, 'dd/MM', 'pt'),
					value: displayType === OrdersDisplayType.BILLING
						? order?.total ?? 0
						: order?.quantity ?? 0
				}
			})
		}

		if (this.filters().periodType === OrdersPeriodType.MONTH) {
			const dates = fillPeriodWithMonths(
				extendedDate("2024-07-01T12:00:00"),
				extendedDate("2024-07-01T12:00:00").plus(12, 'month')
			);

			data = dates.map(date => {
				const order = orders.find(order =>
					formatDate(order.date, 'MM (YYYY)', 'en') === formatDate(date, 'MM (YYYY)', 'pt')
				);

				return {
					label: capitalize(formatDate(date, 'MMMM/YYYY', 'pt')),
					value: displayType === OrdersDisplayType.BILLING
						? order?.total ?? 0
						: order?.quantity ?? 0
				}
			})
		}

		return data;
	});

	monthlyChartData = computed((): ChartData => {
		const startDate = untracked(this.period)['date:min'];

		const data = this.ordersChartItems();
		const average = data.reduce((previousValue, currentValue) =>
			previousValue + currentValue.value, 0
		) / monthsSince(startDate!);

		const displayType = this.formValue().displayType;

		return {
			labels: data.map(item => item.label),
			datasets: [
				{
					label: "Objetivo mensal",
					type: 'line',
					data: data.map(() => displayType === OrdersDisplayType.BILLING ? 6000: 30 * 4),
					borderWidth: 1,
					borderColor: '#0f9360',
					pointHitRadius: 30,
					pointStyle: false,
					backgroundColor: '#0f9360',
				},
				{
					label: "Média mensal",
					type: 'line',
					data: data.map(() => displayType === OrdersDisplayType.BILLING ? average  : Math.round(average)),
					borderWidth: 1,
					borderColor: '#005f99',
					pointStyle: false,
					pointHitRadius: 30,
					backgroundColor: 'rgba(0,95,153,0.24)',
				},
				{
					label: displayType === OrdersDisplayType.BILLING ? "Faturamento": "Quantidade de vendas",
					data: data.map(item => item.value),
					backgroundColor: bluePalette,
					borderColor: bluePalette
				},
			]
		}
	})

	dailyChartData = computed((): ChartData<"line"> => {
		const data = this.ordersChartItems();
		const average = data.reduce((previousValue, currentValue) =>
			previousValue + currentValue.value, 0
		) / data.length;
		const displayType = this.formValue().displayType;

		return {
			labels: data.map(item => item.label),
			datasets: [
				{
					label: "Objetivo diário",
					type: 'line',
					data: data.map(() => displayType === OrdersDisplayType.BILLING ? 6000/30 : 4),
					borderWidth: 1,
					borderColor: '#0f9360',
					pointHitRadius: 30,
					pointStyle: false,
					backgroundColor: '#0f9360',
				},
				{
					label: "Média diária",
					type: 'line',
					data: data.map(() => displayType === OrdersDisplayType.BILLING ? average  : Math.round(average)),
					borderWidth: 1,
					borderColor: '#005f99',
					pointHitRadius: 30,
					pointStyle: false,
					backgroundColor: 'rgba(0,95,153,0.24)',
				},
				{
					label: displayType === OrdersDisplayType.BILLING ? "Faturamento": "Quantidade de vendas",
					data: data.map(item => item.value),
					backgroundColor: '#1c2541',
					borderWidth: 1,
					borderColor: '#1c2541',
					pointBorderColor: (item: ScriptableContext<'line'>) => {
						if (item.raw === 0) return 'transparent';

						return 'red'
					},
					pointBackgroundColor: (item: ScriptableContext<'line'>) => {
						if (item.raw === 0) return 'transparent';

						return 'red'
					},
				},
			]
		}
	});

	totalBilling = computed(() => {
		const data = this.ordersChartItems().reverse();

		return data.reduce((total, current) => total + current.value, 0);
	});

	billingAverage = computed(() => {
		const data = this.ordersChartItems().reverse();

		return (this.totalBilling() ?? 0) / data.length;
	});
}
