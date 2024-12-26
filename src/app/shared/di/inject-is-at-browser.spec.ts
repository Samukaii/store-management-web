import { injectIsAtBrowser } from "src/app/shared/di/inject-is-at-browser";
import { TestBed } from "@angular/core/testing";
import { mockPlatform } from "src/app/testing/mocks/mock-platform";
import { PlatformType } from "src/app/shared/models/platform-type";

interface SetupConfig {
	platform?: PlatformType;
}

const setup = (config?: SetupConfig) => {
	TestBed.configureTestingModule({
		providers: [
			mockPlatform(config?.platform ?? "browser")
		]
	})
}

describe(injectIsAtBrowser.name, () => {
	it('must return true when platform is browser', () => {
		setup({
			platform: "browser",
		});

		TestBed.runInInjectionContext(() => {
			const isAtBrowser = injectIsAtBrowser();

			expect(isAtBrowser).toBe(true);
		})
	});

	it('must return false when platform is server', () => {
		setup({
			platform: "server",
		});

		TestBed.runInInjectionContext(() => {
			const isAtBrowser = injectIsAtBrowser();

			expect(isAtBrowser).toBe(false);
		})
	});
});
