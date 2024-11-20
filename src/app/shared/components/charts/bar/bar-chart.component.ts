import { Component, effect, input } from '@angular/core';
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
    selector: 'app-bar-chart',
    imports: [],
    templateUrl: './bar-chart.component.html',
    styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {
	direction = input<"horizontal" | "vertical">("horizontal");
	data = input.required<ChartData[]>();
	label = input.required<string>();
	chartName = input.required<string>();

	chart?: Chart;

	updateChart = effect(() => {
		this.chart?.destroy();

		const data = this.data();
		if(!this.chartName()) return;

		this.chart = new Chart(this.chartName(), {
			type: 'bar',
			data: {
				labels: this.data().map(item => item.label),
				datasets: [
					{
						label: this.label(),
						data: data.map(item => item.value),
						backgroundColor: '#A94E25',
						borderWidth: 1,
						borderColor: '#A94E25'
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
