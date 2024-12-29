import { Component, computed, effect, ElementRef, input, viewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartData } from "chart.js";

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {
	data = input.required<ChartData<"pie">>();

	private chartElement = viewChild('canvas', {read: ElementRef});

	private element = computed(() =>
		this.chartElement()?.nativeElement as HTMLCanvasElement | undefined
	);

	private chart?: Chart;

	private updateChart = effect(() => {
		this.chart?.destroy();

		const data = this.data();

		const element = this.element()!;

		this.chart = new Chart(element, {
			type: 'pie',
			data
		});
	})
}
