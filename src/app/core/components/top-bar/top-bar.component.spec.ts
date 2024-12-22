import { setupComponentTesting } from "../../../testing/setup-component-testing";
import { TopBarComponent } from "./top-bar.component";
import { hasCreatedComponent } from "../../../testing/has-created-component";
import { TopBarLoadingService } from "./top-bar-loading.service";
import { signal } from "@angular/core";
import { BreadcrumbComponent } from "../breadcrumb/breadcrumb.component";
import { LocalActionsComponent } from "../../../shared/components/local-actions/local-actions.component";
import { MatProgressBar } from "@angular/material/progress-bar";
import { getByDirective } from "../../../testing/getters/get-by-directive";
import { TestBed } from "@angular/core/testing";
import { detectChanges } from "../../../testing/detect-changes";
import { MockComponent } from "ng-mocks";

interface SetupConfig {

}

const setup = (config?: SetupConfig) => {
	const loading = signal(false);

	setupComponentTesting(TopBarComponent, {
		imports: [
			MockComponent(BreadcrumbComponent),
			MockComponent(LocalActionsComponent),
			MockComponent(MatProgressBar)
		],
		providers: [
			{
				provide: TopBarLoadingService,
				useValue: {
					isLoading: loading,
					setLoading: (enabled: boolean) => {
						loading.set(enabled)
					}
				}
			}
		]
	})
}


describe(TopBarComponent.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	describe('Children', () => {
		it('must render BreadcrumbComponent', () => {
			setup();

			expect(getByDirective(BreadcrumbComponent)).toBeTruthy();
		});

		it('must render BreadcrumbComponent', () => {
			setup();

			expect(getByDirective(BreadcrumbComponent)).toBeTruthy();
		});

		it('must render LocalActionsComponent with where = "top-bar"', () => {
			setup();

			const component = getByDirective(LocalActionsComponent);

			expect(component).toBeTruthy();
			expect(component.attributes["where"]).toBe('top-bar');
		});
	});

	describe('Loading', () => {
		it('must show progress bar with indeterminate mode', () => {
			setup();

			const toolbar = getByDirective(MatProgressBar);

			expect(toolbar.attributes['mode']).toBe('indeterminate');
		});

		it('opacity must be 0 when top bar loading is false', () => {
			setup();

			const toolbar = getByDirective(MatProgressBar);

			expect(toolbar.styles['opacity']).toBe('0');
		});

		it('opacity must be 1 when top bar loading is true', () => {
			setup();

			const toolbar = getByDirective(MatProgressBar);

			const topBarService = TestBed.inject(TopBarLoadingService);

			topBarService.setLoading(true);

			detectChanges();

			expect(toolbar.styles['opacity']).toBe('1');
		});
	});
});
