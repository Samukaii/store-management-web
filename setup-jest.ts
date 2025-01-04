import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import { clearCurrentComponentFixture } from "src/app/testing/core/current-component-fixture";
import * as matchers from 'jest-extended';
import { mockChartJs } from "src/app/testing/mocks/mock-chart-js";
import { resetRouterSnapshot } from "src/app/testing/utils/mocked-router";

mockChartJs();

expect.extend(matchers);

setupZoneTestEnv();

afterEach(() => {
	clearCurrentComponentFixture();
	resetRouterSnapshot();
});
