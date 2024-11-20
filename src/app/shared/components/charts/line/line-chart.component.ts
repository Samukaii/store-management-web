import { Component, computed, effect, ElementRef, input, viewChild } from '@angular/core';
import Chart from 'chart.js/auto';

interface ChartData {
	label: string | Date;
	value: any
}

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
	styleUrl: './line-chart.component.scss'
})
export class LineChartComponent {
	direction = input<"horizontal" | "vertical">("horizontal");
	data = input.required<ChartData[]>();
	label = input.required<string>();

	chartElement = viewChild('canvas', {read: ElementRef});

	element = computed(() =>
		this.chartElement()?.nativeElement as HTMLCanvasElement | undefined
	);

	chart?: Chart;

	updateChart = effect(() => {
		this.chart?.destroy();

		const data = this.data();
		const element = this.element();

		if (!element) return;

		this.chart = new Chart(element, {
			type: 'line',
			data: {
				labels: this.data().map(item => item.label),
				datasets: [
					{
						label: this.label(),
						data: data.map(item => item.value),
						backgroundColor: '#1c2541',
						borderWidth: 1,
						borderColor: '#1c2541'
					},
				]
			},
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
