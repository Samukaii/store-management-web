import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";
import { hasCreatedComponent } from "src/app/testing/utils/has-created-component";
import { getMockedChartJs } from "src/app/testing/utils/get-mocked-chart-js";
import { getByTestId } from "src/app/testing/getters/get-by-test-id";
import { PlatformType } from "src/app/shared/models/platform-type";
import { mockPlatform } from "src/app/testing/mocks/mock-platform";
import { findByTestId } from "src/app/testing/getters/find-by-test-id";
import { BarChartComponent } from "src/app/shared/components/charts/bar/bar-chart.component";


interface SetupConfig {
	platform?: PlatformType;
}

const setup = (config?: SetupConfig) => {
	return setupComponentTesting(BarChartComponent, {
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

describe(BarChartComponent.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	describe('When is at browser', () => {
		describe('and component starts', () => {
			it('must show canvas element', () => {
				setup();

				const canvas = getByTestId('canvas-container');

				expect(canvas).toBeTruthy();
			});

			it('canvas container height must be "auto", because default [height] input is "auto"', () => {
				setup();

				const canvas = getByTestId('canvas-container');

				expect(canvas.getStyle("height")).toBe("auto");
			});

			it('must create a chart with canvas element and [data] input on start', () => {
				const chartJsClass = getMockedChartJs().classMock.mockClear();

				setup();

				const canvasElement = getByTestId('canvas').nativeElement;

				expect(chartJsClass).toHaveBeenCalledExactlyOnceWith(canvasElement, expect.objectContaining({
					type: 'bar',
					data: {
						datasets: []
					},
				}));
			});

			it('must register ChartDataLabels as plugin', () => {
				const chartJsClass = getMockedChartJs().classMock.mockClear();

				setup();

				const plugins = chartJsClass.mock.lastCall[1].plugins;

				expect(plugins).toEqual([
					getMockedChartJs().plugins.dataLabel
				]);
			});

			describe('created chart options', () => {
				it('indexAxis must be "x", because default [direction] is "horizontal"', () => {
					const chartJsClass = getMockedChartJs().classMock.mockClear();

					setup();

					const options = chartJsClass.mock.lastCall[1].options;

					expect(options.indexAxis).toBe("x");
				});

				describe('scales.y', () => {
					it('ticks.callback function must return label cropped if length is greater than 15', () => {
						const chartJsClass = getMockedChartJs().classMock.mockClear();

						setup();

						const options = chartJsClass.mock.lastCall[1].options;
						const scalesY = options.scales.y;

						const callback = scalesY.ticks.callback;

						const labelWithMoreThan15Characters = "a".repeat(16);

						const thisBinding = {
							getLabelForValue: (value: number) => value === 12 ?
								labelWithMoreThan15Characters : null
						};

						const result = callback.call(thisBinding, 12) as string;

						expect(result).toBe("aaaaaaaaaaaaaaa...");
					});

					it('ticks.callback function must return whole label if length is less than or equal 15', () => {
						const chartJsClass = getMockedChartJs().classMock.mockClear();

						setup();

						const options = chartJsClass.mock.lastCall[1].options;
						const scalesY = options.scales.y;

						const callback = scalesY.ticks.callback;

						const labelWith15Characters = "a".repeat(15);
						const labelWithLessThan15Characters = "a".repeat(11);

						let thisBinding = {
							getLabelForValue: (value: number) => value === 12 ?
								labelWith15Characters : null
						};

						let result = callback.call(thisBinding, 12) as string;

						expect(result).toBe("aaaaaaaaaaaaaaa");

						thisBinding = {
							getLabelForValue: (value: number) => value === 12 ?
								labelWithLessThan15Characters : null
						};

						result = callback.call(thisBinding, 12) as string;

						expect(result).toBe("aaaaaaaaaaa");
					});

					it('other properties must be properly configured', () => {
						const chartJsClass = getMockedChartJs().classMock.mockClear();

						setup();

						const options = chartJsClass.mock.lastCall[1].options;
						const scalesY = options.scales.y;

						expect(scalesY).toEqual(expect.objectContaining({
							beginAtZero: true,
						}));
					});
				});

				describe('options.plugins.datalabels', () => {
					it('backgroundColor() must return "transparent"', () => {
						const chartJsClass = getMockedChartJs().classMock.mockClear();

						setup();

						const options = chartJsClass.mock.lastCall[1].options;
						const datalabels = options.plugins.datalabels;

						expect(datalabels.backgroundColor()).toBe("transparent");
					});

					it('borderColor() must return "transparent"', () => {
						const chartJsClass = getMockedChartJs().classMock.mockClear();

						setup();

						const options = chartJsClass.mock.lastCall[1].options;
						const datalabels = options.plugins.datalabels;

						expect(datalabels.borderColor()).toBe("transparent");
					});

					it('formatter() must return value provided', () => {
						const chartJsClass = getMockedChartJs().classMock.mockClear();

						setup();

						const options = chartJsClass.mock.lastCall[1].options;
						const datalabels = options.plugins.datalabels;

						expect(datalabels.formatter(12)).toBe(12);
						expect(datalabels.formatter(435)).toBe(435);
						expect(datalabels.formatter("some text")).toBe("some text");
					});

					it('other properties must be properly configured', () => {
						const chartJsClass = getMockedChartJs().classMock.mockClear();

						setup();

						const options = chartJsClass.mock.lastCall[1].options;
						const datalabels = options.plugins.datalabels;

						expect(datalabels).toEqual(expect.objectContaining({
							color: 'white',
							align: 'center',
							textAlign: 'center',
							opacity: 0,
							font: {
								weight: 'bold',
								lineHeight: 2
							},
							padding: 6,
						}));
					});
				});

				it('other properties must be properly configured', () => {
					const chartJsClass = getMockedChartJs().classMock.mockClear();

					setup();

					const options = chartJsClass.mock.lastCall[1].options;

					expect(options).toEqual(expect.objectContaining({
						responsive: true,
						maintainAspectRatio: false,
					}));
				});
			});
		});

		describe('and [height] changes', () => {
			it('must update canvas container height with new height', () => {
				const {changeInput} = setup();

				const canvas = getByTestId('canvas-container');

				changeInput('height', '12px');
				expect(canvas.getStyle('height')).toBe('12px');

				changeInput('height', '2rem');
				expect(canvas.getStyle('height')).toBe('2rem');

				changeInput('height', 'auto');
				expect(canvas.getStyle('height')).toBe('auto');
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

				expect(chartJsClass).toHaveBeenCalledExactlyOnceWith(canvasElement, expect.objectContaining({
					type: 'bar',
					data: {
						labels: ["123", "123"],
						datasets: [
							{
								data: [1, 2, 3]
							}
						]
					},
				}));

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

				expect(chartJsClass).toHaveBeenCalledWith(canvasElement, expect.objectContaining({
					type: 'bar',
					data: {
						labels: ["First label", "Second label"],
						datasets: [
							{
								data: [433, 67, 213]
							}
						]
					},
				}));

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

				expect(chartJsClass).toHaveBeenCalledExactlyOnceWith(canvasElement, expect.objectContaining({
					type: 'bar',
					data: {
						datasets: []
					},
				}));

				let options = chartJsClass.mock.lastCall[1].options;

				expect(options.indexAxis).toBe("y");

				changeInput('direction', 'horizontal');

				expect(destroy).toHaveBeenCalledWith();
				expect(destroy).toHaveBeenCalledTimes(2);

				expect(chartJsClass).toHaveBeenCalledWith(canvasElement, expect.objectContaining({
					type: 'bar',
					data: {
						datasets: []
					},
				}));

				options = chartJsClass.mock.lastCall[1].options;

				expect(options.indexAxis).toBe("x");

				expect(chartJsClass).toHaveBeenCalledTimes(2);
			});
		});
	});

	describe('When is at server', () => {
		describe('and component starts', () => {
			it('must not show canvas element', () => {
				setup({platform: 'server'});

				const canvas = findByTestId('canvas');

				expect(canvas).toBeFalsy();
			});

			it('must show loading', () => {
				setup({platform: 'server'});

				const loading = getByTestId('loading');

				expect(loading).toBeTruthy();
			});

			it('loading height must be "auto", because it is the default value for [height] input', () => {
				setup({platform: 'server'});

				const loading = getByTestId('loading');

				expect(loading.getStyle("height")).toBe("auto");
			});

			it('loading [loading] input must be "true"', () => {
				setup({platform: 'server'});

				const loading = getByTestId('loading');

				expect(loading.getProperty("loading")).toBe(true);
			});

			it('must not create a chart at start', () => {
				const chartJsClass = getMockedChartJs().classMock.mockClear();

				setup({platform: 'server'});

				expect(chartJsClass).not.toHaveBeenCalled();
			});
		});

		describe('and [height] changes', () => {
			it('must update loading height with new height', () => {
				const {changeInput} = setup({platform: 'server'});

				const loading = getByTestId('loading');

				changeInput('height', '12px');
				expect(loading.getStyle('height')).toBe('12px');

				changeInput('height', '2rem');
				expect(loading.getStyle('height')).toBe('2rem');

				changeInput('height', 'auto');
				expect(loading.getStyle('height')).toBe('auto');
			});
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

