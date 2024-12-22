import { AppComponent } from "./app.component";
import { setupComponentTesting } from "./testing/setup-component-testing";
import { hasCreatedComponent } from "./testing/has-created-component";
import { MenuComponent } from "./core/components/menu/menu.component";
import { NavigationContextComponent } from "./core/components/navigation-context/navigation-context.component";
import { TopBarComponent } from "./core/components/top-bar/top-bar.component";
import { RouterOutlet } from "@angular/router";
import { spyDependencyBeforeCreation } from "./testing/spy-dependency-before-creation";
import { MatIconRegistry } from "@angular/material/icon";
import { getByDirective } from "./testing/getters/get-by-directive";
import { getByTestId } from "./testing/getters/get-by-test-id";
import { PLATFORM_ID } from "@angular/core";
import { getCurrentComponentFixture } from "./testing/current-component-fixture";
import { MockComponent, MockDirective } from "ng-mocks";

interface SetupConfig {
	topBarHeight?: number;
	platformId?: Object;
}

const setup = (config?: SetupConfig) => {
	setupComponentTesting(AppComponent, {
		imports: [
			MockComponent(TopBarComponent),
			MockDirective(RouterOutlet),
			MockComponent(MenuComponent),
			MockComponent(NavigationContextComponent)
		],
		providers: [
			{provide: PLATFORM_ID, useValue: config?.platformId ?? ""},
			{
				provide: MatIconRegistry,
				useValue: {
					setDefaultFontSetClass: () => {}
				}
			},
		]
	});
}

describe(AppComponent.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	describe('When component starts', () => {
		it('must set default font class to "material-symbols-outlined"', () => {
			const setDefaultFontSetClass = spyDependencyBeforeCreation(MatIconRegistry, 'setDefaultFontSetClass');

			setup();

			expect(setDefaultFontSetClass.resolve()).toHaveBeenCalledWith('material-symbols-outlined');
		});
	});

	describe('Children', () => {
		it('must render MenuComponent', () => {
			setup();

			expect(getByDirective(MenuComponent)).toBeTruthy();
		});

		it('must render TopBarComponent', () => {
			setup();

			expect(getByDirective(TopBarComponent)).toBeTruthy();
		});

		it('must render NavigationContextComponent', () => {
			setup();

			expect(getByDirective(NavigationContextComponent)).toBeTruthy();
		});
	});

	describe('Routes container', () => {
		describe('When is at browser', () => {
			it('max-height must be equal to viewport height - topBarHeight ', () => {
				setup({
					topBarHeight: 50,
					platformId: 'browser',
				});

				getCurrentComponentFixture()?.detectChanges();

				const container = getByTestId('routes-container');

				expect(container?.styles["max-height"]).toBe('calc(100vh - 50px)')
			});
		});
	});
});
