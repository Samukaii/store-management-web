import { getMockedChartJs } from "src/app/testing/utils/get-mocked-chart-js";

export const mockChartJs = () => {
	jest.mock('chart.js/auto', () => {
		return getMockedChartJs().classMock;
	});
}
