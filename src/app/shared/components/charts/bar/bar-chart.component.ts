import { Component, computed, effect, ElementRef, input, viewChild } from '@angular/core';
import Chart, { ChartData } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { injectIsAtBrowser } from "../../../di/inject-is-at-browser";
import { WindowLoadingComponent } from "src/app/core/components/window-loading/window-loading.component";

export const chartBluePalette: string[] = [
	"#001f3f",
	"#002e5d",
	"#003f5c",
	"#2c5282",
	"#2b6cb0",
	"#3182ce",
	"#4299e1",
	"#005f99",
	"#0077b3",
	"#63b3ed",
	"#7ed3f4",
	"#90cdf4",
	"#1c3d5a",
	"#001828",
	"#003046",
];

@Component({
	selector: 'app-bar-chart',
	templateUrl: './bar-chart.component.html',
	imports: [
		WindowLoadingComponent
	],
	styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {
	direction = input<"horizontal" | "vertical">("horizontal");
	data = input.required<ChartData>();
	chartElement = viewChild('canvas', {read: ElementRef});
	minHeight = input(500);
	height = input<string>("auto");

	isAtBrowser = injectIsAtBrowser();

	element = computed(() =>
		this.chartElement()?.nativeElement as HTMLCanvasElement | undefined
	);

	chart?: Chart;

	updateChart = effect(() => {
		this.chart?.destroy();

		const element = this.element();

		if (!element) return;

		this.chart = new Chart(element, {
			type: 'bar',
			plugins: [ChartDataLabels],
			data: this.data(),
			options: {
				indexAxis: this.direction() === "horizontal" ? "x" : "y",
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					y: {
						beginAtZero: true,
						ticks: {
							callback: function (value) {
								const label = this.getLabelForValue(value as number);

								if (label.length <= 15) return label;

								return label.substring(0, 15) + '...';
							},

						}
					},
				},
				plugins: {
					datalabels: {
						backgroundColor: () => 'transparent',
						borderColor: () => 'transparent',
						color: 'white',
						align: 'center',
						textAlign: 'center',
						opacity: 0,
						font: {
							weight: 'bold',
							lineHeight: 2
						},
						padding: 6,
						formatter: (value: number) => value
					},
				}
			},
		});
	})
}
