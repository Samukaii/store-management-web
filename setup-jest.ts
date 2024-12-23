import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import { clearCurrentComponentFixture } from "./src/app/testing/core/current-component-fixture";

import * as matchers from 'jest-extended';
expect.extend(matchers);

setupZoneTestEnv();

afterEach(() => {
	clearCurrentComponentFixture();
});
