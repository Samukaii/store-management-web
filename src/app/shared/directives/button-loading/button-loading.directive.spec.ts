import { setupComponentTesting } from "../../../testing/setup/setup-component-testing";
import { Component, signal } from "@angular/core";
import { getCurrentComponentFixture } from "../../../testing/core/current-component-fixture";
import { detectChanges } from "../../../testing/utils/detect-changes";
import { hasCreatedComponent } from "../../../testing/utils/has-created-component";
import { ButtonLoadingDirective } from "./button-loading.directive";
import { MatButton } from "@angular/material/button";
import { getByDirective } from "../../../testing/getters/get-by-directive";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MockProvider } from "ng-mocks";
import { ButtonRequestLoadingService } from "../button-request-loading/button-request-loading.service";

const setup = () => {
	@Component({
		template: `
			<button
				appButtonLoading
				mat-button
				[loading]="loading()"
				[color]="color()"
			>
			</button>
		`,
		imports: [
			ButtonLoadingDirective,
			MatButton
		],
		selector: "app-root-test",
	})
	class HostComponent {
		loading= signal(false);
		color= signal("");
	}

	setupComponentTesting(HostComponent, {
		imports: [ButtonLoadingDirective, MatButton],
		providers: [
			MockProvider(ButtonRequestLoadingService)
		]
	});

	return {component: getCurrentComponentFixture<HostComponent>().componentInstance}
}

describe(ButtonLoadingDirective.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	describe('When loading is true', () => {
		it('must add class mat-loading and set pointer-events to none for mat-button', () => {
			const {component} = setup();

			component.loading.set(true);
			detectChanges();

			const button = getByDirective(MatButton);

			expect(button.classes['mat-loading']).toBeTrue();
			expect(button.styles['pointer-events']).toBe('none');
		});

		it('must add correct color class to mat-button', () => {
			const {component} = setup();

			component.loading.set(true);
			component.color.set('some-specific-color');

			detectChanges();

			const button = getByDirective(MatButton);

			expect(button.classes['color-some-specific-color']).toBeTrue();
		});

		it('must create a spinner with 20 of diameter and mode indeterminate inside mat-button', () => {
			const {component} = setup();

			component.loading.set(true);
			component.color.set('some-specific-color');

			detectChanges();

			const button = getByDirective(MatButton);

			const spinner = button.getByDirective(MatProgressSpinner).componentInstance;

			expect(spinner.diameter).toBe(20);
			expect(spinner.mode).toBe('indeterminate');
		});
	});

	describe('When loading became false', () => {
		it('must remove class mat-loading and set pointer-events to "auto" for mat-button', () => {
			const {component} = setup();

			component.loading.set(true);
			detectChanges();

			component.loading.set(false);
			detectChanges();

			const button = getByDirective(MatButton);

			expect(button.classes['mat-loading']).toBeUndefined();
			expect(button.styles['pointer-events']).toBe('auto');
		});

		it('must remove color class to mat-button', () => {
			const {component} = setup();

			component.loading.set(true);
			component.color.set('some-specific-color');
			detectChanges();

			component.loading.set(false);
			detectChanges();

			const button = getByDirective(MatButton);

			expect(button.classes['color-some-specific-color']).toBeUndefined();
		});

		it('must destroy the spinner inside mat-button', () => {
			const {component} = setup();

			component.loading.set(true);
			component.color.set('some-specific-color');
			detectChanges();

			component.loading.set(false);
			detectChanges();

			const button = getByDirective(MatButton);

			const spinner = button.findByDirective(MatProgressSpinner);

			expect(spinner).toBeUndefined();
		});
	});
});
