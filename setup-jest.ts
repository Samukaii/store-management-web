import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import { clearCurrentComponentFixture } from "src/app/testing/core/current-component-fixture";
import * as matchers from 'jest-extended';
import { mockChartJs } from "src/app/testing/mocks/mock-chart-js";

mockChartJs();

expect.extend(matchers);

setupZoneTestEnv();

afterEach(() => {
	clearCurrentComponentFixture();
});
