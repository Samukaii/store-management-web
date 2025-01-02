import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";
import { hasCreatedComponent } from "src/app/testing/utils/has-created-component";
import { PieChartComponent } from "src/app/shared/components/charts/pie/pie-chart.component";
import { getMockedChartJs } from "src/app/testing/utils/get-mocked-chart-js";
import { getByTestId } from "src/app/testing/getters/get-by-test-id";
import { PlatformType } from "src/app/shared/models/platform-type";
import { mockPlatform } from "src/app/testing/mocks/mock-platform";


interface SetupConfig {
	platform?: PlatformType;
}

const setup = (config?: SetupConfig) => {
	return setupComponentTesting(PieChartComponent, {
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

describe(PieChartComponent.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	describe('When is at browser', () => {
		it('must create a chart with canvas element and [data] input', () => {
			const chartJsClass = getMockedChartJs().classMock.mockClear();

			setup();

			const canvasElement = getByTestId('canvas').nativeElement;

			expect(chartJsClass).toHaveBeenCalledExactlyOnceWith(canvasElement, {
				type: 'pie',
				data: {
					datasets: []
				}
			});
		});

		describe('When [data] changes', () => {
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
					type: 'pie',
					data: {
						labels: ["123", "123"],
						datasets: [
							{
								data: [1, 2, 3]
							}
						]
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
					type: 'pie',
					data: {
						labels: ["First label", "Second label"],
						datasets: [
							{
								data: [433, 67, 213]
							}
						]
					}
				});

				expect(chartJsClass).toHaveBeenCalledTimes(2);
			});
		});
	});

	describe('When is at server', () => {
		it('must not create a chart', () => {
			const chartJsClass = getMockedChartJs().classMock.mockClear();

			setup({platform: 'server'});

			expect(chartJsClass).not.toHaveBeenCalled();
		});

		describe('When [data] changes', () => {
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
	});
});
