import { booleanAttribute, Component, computed, effect, ElementRef, input, viewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { injectIsAtBrowser } from "../../../di/inject-is-at-browser";
import { WindowLoadingComponent } from "../../../../core/components/window-loading/window-loading.component";
import { ChartDataset } from "chart.js";


interface ChartData {
	label: string | Date;
	value: any
}

const bluePalette: string[] = [
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

const colorfulPalette: string[] = [
	"#2D9A4B",
	"#5A2DFF",
	"#FF8D1A",
	"#FF1493",
	"#FF5733",
	"#FF33CC",
	"#FFB71B",
	"#FFD700",
	"#1E90FF",
	"#FF00FF",
	"#8A2BE2",
	"#FF6347",
	"#33FF57",
	"#00BFFF",
	"#7FFF00"
]


const getColor = (index: number): string => {
	return bluePalette[index % bluePalette.length];
}

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
	data = input.required<ChartData[]>();
	label = input.required<string>();
	chartElement = viewChild('canvas', {read: ElementRef});
	minHeight = input(500);
	height = input<string>();
	minItemsCount = input(15);
	heightPerData = input(30);
	thickness = input<number | 'flex'>('flex');
	showAverage = input(false, {transform: booleanAttribute});

	isAtBrowser = injectIsAtBrowser();

	element = computed(() =>
		this.chartElement()?.nativeElement as HTMLCanvasElement | undefined
	);

	adjustedData = computed(() => {
		let data = this.data();

		if(data.length < this.minItemsCount()) {
			data = [
				...data,
				...(new Array(this.minItemsCount() - data.length).fill(null).map(() => {
					return {
						label: "",
						value: 0
					}
				}))
			]
		}

		return data;
	})

	chart?: Chart;

	updateChart = effect(() => {
		this.chart?.destroy();

		const data = this.adjustedData();

		const element = this.element();

		const average = data.reduce((previousValue, currentValue) =>
			previousValue + currentValue.value, 0
		) / data.length;

		if (!element) return;

		this.chart = new Chart(element, {
			type: 'bar',
			plugins: [ChartDataLabels],
			data: {
				labels: data.map(item => item.label),
				datasets: [
					this.showAverage() ? {
						label: "Média",
						type: 'line',
						data: data.map(() => average),
						borderWidth: 1,
						borderColor: '#005f99',
						pointStyle: false,
						pointHitRadius: 30,
						backgroundColor: 'rgba(0,95,153,0.24)',
					} : [],
					{
						label: this.label(),
						data: data.map(item => item.value),
						backgroundColor: bluePalette,
						maxBarThickness: this.thickness() === 'flex' ? undefined : +this.thickness(),
						borderColor: bluePalette
					},
				].flat() as ChartDataset[]
			},
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

	calculatedHeight = computed(() => {
		return this.adjustedData().length * this.heightPerData() + 100;
	})

	elementHeight = computed(() => {
		if (this.height()) return this.height()!;

		if (this.direction() === "horizontal")
			return "auto"

		return this.calculatedHeight() + 'px';
	})
}
