import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";
import { Component, signal } from "@angular/core";
import { AppColor } from "../../components/button/models/app-color";
import { getCurrentComponentFixture } from "src/app/testing/core/current-component-fixture";
import { getByTestId } from "src/app/testing/getters/get-by-test-id";
import { detectChanges } from "src/app/testing/utils/detect-changes";
import { hasCreatedComponent } from "src/app/testing/utils/has-created-component";
import { ButtonExtendedDirective } from "./button-extended.directive";
import { getByDirective } from "src/app/testing/getters/get-by-directive";
import { MatButton } from "@angular/material/button";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

const setup = () => {
	@Component({
		template: `
			<button
				data-test-id="button"
				appButtonExtended
				mat-button
				[color]="color()"
				[loading]="loading()"
			>

			</button>
		`,
		imports: [ButtonExtendedDirective, MatButton],
		selector: "app-root-test",
	})
	class HostComponent {
		color = signal<AppColor>('primary');
		loading = signal(false);
	}

	setupComponentTesting(HostComponent, {
		imports: [ButtonExtendedDirective, MatButton],
	});

	return {component: getCurrentComponentFixture<HostComponent>().componentInstance}
}

const colorTestCases: {color: AppColor; expectedClass: string}[] = [
	{color: 'red', expectedClass: 'color-red'},
	{color: 'blue', expectedClass: 'color-blue'},
	{color: 'primary', expectedClass: 'color-primary'},
	{color: 'white', expectedClass: 'color-white'},
];

describe(ButtonExtendedDirective.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	test.each(colorTestCases)
	(`must add class "$expectedClass" when [color] is $color`, ({color, expectedClass}) => {
		const {component} = setup();

		component.color.set(color);
		detectChanges();

		const button = getByTestId('button');

		expect(button.classes[expectedClass]).toBe(true);
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

		test.each(colorTestCases)
		('must add class $expectedClass to mat-button when color is $color', ({color, expectedClass}) => {
			const {component} = setup();

			component.loading.set(true);
			component.color.set(color);

			detectChanges();

			const button = getByDirective(MatButton);

			expect(button.classes[expectedClass]).toBeTrue();
		});

		it('must create a spinner with 20 of diameter and mode indeterminate inside mat-button', () => {
			const {component} = setup();

			component.loading.set(true);

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

		test.each(colorTestCases)
		('must remove class $expectedClass from mat-button when color is $color', ({color, expectedClass}) => {
			const {component} = setup();

			component.loading.set(true);
			component.color.set(color);
			detectChanges();

			component.loading.set(false);
			detectChanges();

			const button = getByDirective(MatButton);

			expect(button.classes[expectedClass]).toBeUndefined();
		});

		it('must destroy the spinner inside mat-button', () => {
			const {component} = setup();

			component.loading.set(true);
			detectChanges();

			component.loading.set(false);
			detectChanges();

			const button = getByDirective(MatButton);

			const spinner = button.findByDirective(MatProgressSpinner);

			expect(spinner).toBeUndefined();
		});
	});
});
