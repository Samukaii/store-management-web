import { booleanAttribute, Component, computed, effect, ElementRef, input, viewChild } from '@angular/core';
import Chart, { ChartData } from 'chart.js/auto';
import { injectIsAtBrowser } from "../../../di/inject-is-at-browser";

@Component({
	selector: 'app-line-chart',
	templateUrl: './line-chart.component.html',
	imports: [],
	styleUrl: './line-chart.component.scss'
})
export class LineChartComponent {
	direction = input<"horizontal" | "vertical">("horizontal");
	data = input.required<ChartData<"line">>();
	label = input.required<string>();
	showAverage = input(false, {transform: booleanAttribute});
	isAtBrowser = false;

	chartElement = viewChild('canvas', {read: ElementRef});

	element = computed(() =>
		this.chartElement()?.nativeElement as HTMLCanvasElement | undefined
	);

	constructor() {
		this.isAtBrowser = injectIsAtBrowser();
	}

	chart?: Chart;

	updateChart = effect(() => {
		this.chart?.destroy();

		const element = this.element();

		if (!element) return;

		this.chart = new Chart(element, {
			type: 'line',
			data: {...this.data()},
			options: {
				indexAxis: this.direction() === "horizontal" ? "x" : "y",
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
		});
	})
}
