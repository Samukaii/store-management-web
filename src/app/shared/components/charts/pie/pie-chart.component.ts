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

const getColor = (index: number, palette = bluePalette): string => {
	return palette[index % palette.length];
}

@Component({
	selector: 'app-pie-chart',
	standalone: true,
	imports: [],
	templateUrl: './pie-chart.component.html',
	styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {
	data = input.required<ChartData[]>();
	label = input.required<string>();
	chartName = input.required<string>();

	chart?: Chart<'pie'>;

	updateChart = effect(() => {
		this.chart?.destroy();

		const data = this.data();
		if(!this.chartName()) return;

		this.chart = new Chart(this.chartName(), {
			type: 'pie',
			data: {
				labels: this.data().map(item => item.label),
				datasets: [
					{
						label: this.label(),
						data: data.map(item => item.value),
						backgroundColor: data.map((_, index) => getColor(index, colorfulPalette)),
						borderWidth: 1,
					},
				]
			},
		});
	})
}
