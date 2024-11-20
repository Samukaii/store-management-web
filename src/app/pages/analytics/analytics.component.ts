import { Component, computed, inject } from '@angular/core';
import { resource } from "../../shared/signals/resource";
import { WindowLoadingComponent } from "../../core/components/window-loading/window-loading.component";
import { formatDate, JsonPipe } from "@angular/common";
import { FormRadioComponent } from "../../shared/components/form/radio/form-radio.component";
import { BasicOption } from "../../shared/models/basic-option";
import { FormGroup, NonNullableFormBuilder } from "@angular/forms";
import { toSignal } from "@angular/core/rxjs-interop";
import { BestSellingDisplayType } from "./enum/best-selling-display-type";
import { AnalyticsService } from "./analytics.service";
import { BarChartComponent } from "../../shared/components/charts/bar/bar-chart.component";
import { LineChartComponent } from "../../shared/components/charts/line/line-chart.component";
import { PieChartComponent } from "../../shared/components/charts/pie/pie-chart.component";
import { FlexRowComponent } from "../../shared/components/flex-row/flex-row.component";
import { DateRangeComponent } from "../../shared/components/date-range/date-range.component";

const formValue = <Form extends FormGroup>(form: Form) => {
	return toSignal<ReturnType<Form['getRawValue']>, ReturnType<Form['getRawValue']>>(form.valueChanges, {initialValue: form.getRawValue()});
}

const controlValue = <Form extends FormGroup, Key extends keyof Form['controls']>(form: Form, key: Key) => {
	const control = form.get(key as string)!;
	type ControlValue = Form['controls'][Key]['value'];

	return toSignal<ControlValue, ControlValue>(control.valueChanges, {initialValue: control.value});
}

@Component({
    selector: 'app-analytics',
    imports: [
        BarChartComponent,
        WindowLoadingComponent,
        JsonPipe,
        FormRadioComponent,
        BarChartComponent,
        LineChartComponent,
        PieChartComponent,
        FlexRowComponent,
        DateRangeComponent
    ],
    templateUrl: './analytics.component.html',
    styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {
	service = inject(AnalyticsService);

	form = inject(NonNullableFormBuilder).group({
		displayType: [BestSellingDisplayType.SALES_QUANTITY as BestSellingDisplayType],
		startDate: [null as any as Date],
		endDate: [null as any as Date],
	});

	displayType = controlValue(this.form, 'displayType');
	startDate = controlValue(this.form, 'startDate');
	endDate = controlValue(this.form, 'endDate');

	params = computed(() => {
		return {
			startDate: this.startDate(),
			endDate: this.endDate(),
		}
	}, {
		equal: (prev, curr) => {
			if (!curr.startDate || !curr.endDate) return true;

			if (new Date(prev.startDate).getTime() !== new Date(curr.startDate).getTime())
				return false;

			if (new Date(prev.endDate).getTime() !== new Date(curr.endDate).getTime())
				return false;

			return true
		}
	});

	products = resource({
		initialValue: [],
		request: this.params,
		loader: (params) => this.service.bestSellingProducts(params)
	});

	orders = resource({
		initialValue: [],
		loader: () => this.service.ordersByPeriod()
	});


	chartData = computed(() => {
		return this.products.data().map(item => {
			return {
				label: item.product.name,
				value: this.displayType() === BestSellingDisplayType.SALES_QUANTITY
					? item.salesQuantity ?? 0
					: item.totalBilled
			}
		}).sort((prev, curr) => curr.value - prev.value)
	});

	label = computed(() => {
		const displayType = this.displayType();

		return this.options.find(option => option.value === displayType)?.name ?? "";
	});
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

	profitMargin = computed(() => {
		const data = this.products.data();

		const totalProfitMargin = data.reduce((item, current) =>
			item + current.product.profitMargin * current.salesQuantity, 0
		);

		const totalSales = data.reduce((item, current) =>
			item + current.salesQuantity, 0
		);

		return totalProfitMargin / totalSales;
	})
	dataProfits = computed(() => {
		return this.products.data().map(item => ({profit: item.product.profitMargin, quantity: item.salesQuantity}))
	});

	ordersChartData = computed(() => {
		const now = new Date();

		const allDates = new Array(48).fill(0).map((_, index) => {
			const date = new Date(now);

			date.setDate(date.getDate() - index);

			return date;
		});

		const orders = this.orders.data();

		return allDates.reverse().map(date => {
			const order = orders.find(order =>
				formatDate(order.date, 'dd/MM/yyyy', 'en') === formatDate(date, 'dd/MM/yyyy', 'en')
			);

			return {
				label: formatDate(date, 'dd/MM', 'en'),
				value: order?.total ?? 0
			}
		})
	});

	totalBilling = computed(() => {
		const data = this.ordersChartData();

		return data.reduce((total, current) => total + current.value, 0);
	});

	billingAverage = computed(() => {
		const data = this.ordersChartData();

		return this.totalBilling() / data.length;
	});
}
