import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";
import { WindowLoadingComponent } from "./window-loading.component";
import { hasCreatedComponent } from "src/app/testing/utils/has-created-component";
import { Component, NO_ERRORS_SCHEMA, signal } from "@angular/core";
import { getCurrentComponentFixture } from "src/app/testing/core/current-component-fixture";
import { getByTestId } from "src/app/testing/getters/get-by-test-id";
import { findByTestId } from "src/app/testing/getters/find-by-test-id";
import { detectChanges } from "src/app/testing/utils/detect-changes";
import { mockComponent } from "src/app/testing/mocks/mock-component";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { TestBed } from "@angular/core/testing";
import { MockProvider } from "ng-mocks";
import { TopBarLoadingService } from "../top-bar/top-bar-loading.service";
import { spyDependency } from "src/app/testing/spies/spy-dependency";

const setup = () => {
	@Component({
		selector: 'app-root-test',
		imports: [
			WindowLoadingComponent,
		],
		template: `
			<app-window-loading
				[loading]="loading()"
				[strokeWidth]="strokeWidth()"
				[diameter]="diameter()"
				[noPreservation]="noPreservation()"
			>
				<div data-test-id="child">
					Text inside child
				</div>
			</app-window-loading>`
	})
	class HostComponent {
		loading = signal(false);
		strokeWidth = signal(0);
		diameter = signal(0);
		noPreservation = signal(false);
	}

	TestBed.overrideComponent(WindowLoadingComponent, {
		set: {
			imports: [mockComponent(MatProgressSpinner)],
			schemas: [NO_ERRORS_SCHEMA]
		}
	})

	setupComponentTesting(HostComponent, {
		imports: [WindowLoadingComponent],
		providers: [
			MockProvider(TopBarLoadingService)
		]
	});

	return {component: getCurrentComponentFixture<HostComponent>().componentInstance}
}


describe(WindowLoadingComponent.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	describe('When not loading (default)', () => {
		it('must show child content', () => {
			setup();

			const child = getByTestId('child');

			expect(child).toBeTruthy();
			expect(child.text()).toBe("Text inside child");
		});

		it('must not show spinner', () => {
			setup();

			const spinner = findByTestId('spinner');

			expect(spinner).toBeUndefined();
		});
	});

	describe('When loading', () => {
		it('must not show child content', () => {
			const {component} = setup();

			component.loading.set(true);
			detectChanges();

			const child = findByTestId('child');

			expect(child).toBeUndefined();
		});

		it('must show spinner', () => {
			const {component} = setup();

			component.loading.set(true);
			detectChanges();

			const spinner = getByTestId('spinner');

			expect(spinner).toBeTruthy();
		});

		it('spinner mode must be indeterminate', () => {
			const {component} = setup();

			component.loading.set(true);
			detectChanges();

			const spinner = getByTestId('spinner');
			const mode = spinner.getProperty<string>('mode');

			expect(mode).toBe('indeterminate');
		});

		it('spinner must receive strokeWidth from input', () => {
			const {component} = setup();

			component.loading.set(true);
			component.strokeWidth.set(123);
			detectChanges();

			const spinner = getByTestId('spinner');
			const strokeWidth = spinner.getProperty<number>('strokeWidth');

			expect(strokeWidth).toBe(123);
		});

		it('spinner must receive diameter from input', () => {
			const {component} = setup();

			component.loading.set(true);
			component.diameter.set(435);
			detectChanges();

			const spinner = getByTestId('spinner');

			const diameter = spinner.getProperty<number>('diameter');

			expect(diameter).toBe(435);
		});
	});

	describe('When no preservation is false (default)', () => {
		it('must keep showing child content after first loading switch', () => {
			const {component} = setup();

			component.loading.set(true);
			detectChanges();

			component.loading.set(false);
			detectChanges();

			component.loading.set(true);
			detectChanges();

			const child = getByTestId('child');

			expect(child).toBeTruthy();
			expect(child.text()).toBe("Text inside child");
		});

		it('must not show progress spinner after first loading switch', () => {
			const {component} = setup();

			component.loading.set(true);
			detectChanges();

			component.loading.set(false);
			detectChanges();

			component.loading.set(true);
			detectChanges();

			const spinner = findByTestId('spinner');

			expect(spinner).toBeUndefined();
		});

		it('must call call TopBarLoadingService setLoading with false before first loading switch and true after', () => {
			const {component} = setup();
			const setLoading = spyDependency(TopBarLoadingService, 'setLoading');

			component.loading.set(true);
			detectChanges();

			component.loading.set(false);
			detectChanges();

			component.loading.set(true);
			detectChanges();

			expect(setLoading).toHaveBeenNthCalledWith(1, false);
			expect(setLoading).toHaveBeenNthCalledWith(2, false);
			expect(setLoading).toHaveBeenNthCalledWith(3, true);
			expect(setLoading).toHaveBeenCalledTimes(3);
		});
	});

	describe('When no preservation is true', () => {
		it('must hide child content even after first loading switch', () => {
			const {component} = setup();

			component.noPreservation.set(true);
			detectChanges();

			component.loading.set(true);
			detectChanges();

			component.loading.set(false);
			detectChanges();

			component.loading.set(true);
			detectChanges();

			const child = findByTestId('child');

			expect(child).toBeUndefined();
		});

		it('must show progress spinner even after first loading switch', () => {
			const {component} = setup();

			component.noPreservation.set(true);
			detectChanges();

			component.loading.set(true);
			detectChanges();

			component.loading.set(false);
			detectChanges();

			component.loading.set(true);
			detectChanges();

			const spinner = getByTestId('spinner');

			expect(spinner).toBeTruthy();
		});

		it('must call call TopBarLoadingService setLoading always with false', () => {
			const {component} = setup();
			const setLoading = spyDependency(TopBarLoadingService, 'setLoading');

			component.noPreservation.set(true);
			detectChanges();

			component.loading.set(true);
			detectChanges();

			component.loading.set(false);
			detectChanges();

			component.loading.set(true);
			detectChanges();

			expect(setLoading).toHaveBeenNthCalledWith(1, false);
			expect(setLoading).toHaveBeenNthCalledWith(2, false);
			expect(setLoading).toHaveBeenNthCalledWith(3, false);
			expect(setLoading).toHaveBeenCalledTimes(3);
		});
	});
});
