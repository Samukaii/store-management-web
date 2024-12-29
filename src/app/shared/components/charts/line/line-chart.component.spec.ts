import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";
import { hasCreatedComponent } from "src/app/testing/utils/has-created-component";
import { getMockedChartJs } from "src/app/testing/utils/get-mocked-chart-js";
import { getByTestId } from "src/app/testing/getters/get-by-test-id";
import { LineChartComponent } from "src/app/shared/components/charts/line/line-chart.component";
import { PlatformType } from "src/app/shared/models/platform-type";
import { mockPlatform } from "src/app/testing/mocks/mock-platform";
import { findByTestId } from "src/app/testing/getters/find-by-test-id";


interface SetupConfig {
	platform?: PlatformType;
}

const setup = (config?: SetupConfig) => {
	return setupComponentTesting(LineChartComponent, {
		inputs: {
			data: {
				datasets: []
			}
		},
		providers: [
			mockPlatform(config?.platform ?? "browser")
		]
	})
}

fdescribe(LineChartComponent.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	describe('When is at browser', () => {
		it('must show canvas element', () => {
			setup();

			const canvas = getByTestId('canvas');

			expect(canvas).toBeTruthy();
		});

		it('must create a chart with canvas element and [data] input on start', () => {
			const chartJsClass = getMockedChartJs().classMock.mockClear();

			setup();

			const canvasElement = getByTestId('canvas').nativeElement;

			expect(chartJsClass).toHaveBeenCalledExactlyOnceWith(canvasElement, {
				type: 'line',
				data: {
					datasets: []
				},
				options: {
					indexAxis: "x",
					scales: {
						y: {
							beginAtZero: true,
						}
					}
				}
			});
		});

		describe('and [data] changes', () => {
			it('must destroy previous chart and recreate with new data', () => {
				const chartJsClass = getMockedChartJs().classMock.mockClear();
				const destroy = getMockedChartJs().instance.destroy.mockClear();

				const {changeInput} = setup();

				const canvasElement = getByTestId('canvas').nativeElement;

				chartJsClass.mockClear();

				changeInput('data', {
					labels: ["123", "123"],
					datasets: [
						{
							data: [1, 2, 3]
						}
					]
				});

				expect(destroy).toHaveBeenCalledExactlyOnceWith();

				expect(chartJsClass).toHaveBeenCalledExactlyOnceWith(canvasElement, {
					type: 'line',
					data: {
						labels: ["123", "123"],
						datasets: [
							{
								data: [1, 2, 3]
							}
						]
					},
					options: {
						indexAxis: "x",
						scales: {
							y: {
								beginAtZero: true,
							}
						}
					}
				});

				changeInput('data', {
					labels: ["First label", "Second label"],
					datasets: [
						{
							data: [433, 67, 213]
						}
					]
				});

				expect(destroy).toHaveBeenCalledWith();
				expect(destroy).toHaveBeenCalledTimes(2);

				expect(chartJsClass).toHaveBeenCalledWith(canvasElement, {
					type: 'line',
					data: {
						labels: ["First label", "Second label"],
						datasets: [
							{
								data: [433, 67, 213]
							}
						]
					},
					options: {
						indexAxis: "x",
						scales: {
							y: {
								beginAtZero: true,
							}
						}
					}
				});

				expect(chartJsClass).toHaveBeenCalledTimes(2);
			});
		});

		describe('and [direction] changes', () => {
			it('must destroy previous chart and recreate with indexAxis "x" for "horizontal" and "y" for "vertical"', () => {
				const chartJsClass = getMockedChartJs().classMock.mockClear();
				const destroy = getMockedChartJs().instance.destroy.mockClear();

				const {changeInput} = setup();

				const canvasElement = getByTestId('canvas').nativeElement;

				chartJsClass.mockClear();

				changeInput('direction', 'vertical');

				expect(destroy).toHaveBeenCalledExactlyOnceWith();

				expect(chartJsClass).toHaveBeenCalledExactlyOnceWith(canvasElement, {
					type: 'line',
					data: {
						datasets: []
					},
					options: {
						indexAxis: "y",
						scales: {
							y: {
								beginAtZero: true,
							}
						}
					}
				});

				changeInput('direction', 'horizontal');

				expect(destroy).toHaveBeenCalledWith();
				expect(destroy).toHaveBeenCalledTimes(2);

				expect(chartJsClass).toHaveBeenCalledWith(canvasElement, {
					type: 'line',
					data: {
						datasets: []
					},
					options: {
						indexAxis: "x",
						scales: {
							y: {
								beginAtZero: true,
							}
						}
					}
				});

				expect(chartJsClass).toHaveBeenCalledTimes(2);
			});
		});
	});

	describe('When is at server', () => {
		it('must not show canvas element', () => {
			setup({platform: 'server'});

			const canvas = findByTestId('canvas');

			expect(canvas).toBeFalsy();
		});

		it('must not create a chart at start', () => {
			const chartJsClass = getMockedChartJs().classMock.mockClear();

			setup({platform: 'server'});

			expect(chartJsClass).not.toHaveBeenCalled();
		});

		describe('and [data] changes', () => {
			it('must not destroy previous chart and do not recreate the chart', () => {
				const chartJsClass = getMockedChartJs().classMock.mockClear();
				const destroy = getMockedChartJs().instance.destroy.mockClear();

				const {changeInput} = setup({platform: 'server'});

				chartJsClass.mockClear();

				changeInput('data', {
					labels: ["123", "123"],
					datasets: [
						{
							data: [1, 2, 3]
						}
					]
				});

				changeInput('data', {
					labels: ["First label", "Second label"],
					datasets: [
						{
							data: [433, 67, 213]
						}
					]
				});

				expect(destroy).not.toHaveBeenCalled();
				expect(chartJsClass).not.toHaveBeenCalled();
			});
		});

		describe('and [direction] changes', () => {
			it('must not destroy previous chart and do not recreate the chart', () => {
				const chartJsClass = getMockedChartJs().classMock.mockClear();
				const destroy = getMockedChartJs().instance.destroy.mockClear();

				const {changeInput} = setup({platform: 'server'});

				chartJsClass.mockClear();

				changeInput('direction', 'horizontal');
				changeInput('direction', 'vertical');

				expect(destroy).not.toHaveBeenCalled();
				expect(chartJsClass).not.toHaveBeenCalled();
			});
		});
	});
});

