import { booleanAttribute, Component, computed, effect, ElementRef, input, viewChild } from '@angular/core';
import Chart, { ChartData, ScriptableContext } from 'chart.js/auto';
import { injectIsAtBrowser } from "../../../di/inject-is-at-browser";
import { ChartDataset } from "chart.js";


const bluePalette: string[] = [
	"#001f3f", // Azul muito escuro
	"#002e5d", // Azul escuro
	"#003f5c",
	"#2c5282",
	"#2b6cb0",
	"#3182ce",
	"#4299e1",
	"#005f99", // Azul intenso escuro
	"#0077b3", // Azul médio escuro
	"#63b3ed",
	"#7ed3f4",
	"#90cdf4",
	"#1c3d5a", // Azul acinzentado escuro
	"#001828", // Azul quase preto
	"#003046", // Azul profundo
];


const getColor = (index: number): string => {
	return bluePalette[index % bluePalette.length];
}

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

// this.showAverage() ? {
// 	label: "Média",
// 	type: 'line',
// 	data: data.map(() => average),
// 	borderWidth: 1,
// 	borderColor: '#005f99',
// 	pointHitRadius: 30,
// 	pointStyle: false,
// 	backgroundColor: 'rgba(0,95,153,0.24)',
// } as ChartDataset<'line'> : [],
