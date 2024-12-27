import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";
import { MonthFormatDirective } from "./month-format.directive";
import { Component } from "@angular/core";
import { getByTestId } from "src/app/testing/getters/get-by-test-id";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { hasCreatedComponent } from "src/app/testing/utils/has-created-component";


const setup = () => {
	@Component({
		template: `
			<div data-test-id="child" appMonthFormat>
			</div>
		`,
		selector: "app-root-test",
		imports: [
			MonthFormatDirective
		]
	})
	class HostComponent {

	}

	setupComponentTesting(HostComponent, {
		imports: [MonthFormatDirective],
	})
}


describe(MonthFormatDirective.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	it('must provide a MAT_DATE_LOCALE with correct month format', () => {
		setup();

		const dateFormats = getByTestId('child').read(MAT_DATE_FORMATS);

		expect(dateFormats).toEqual({
			parse: {
				dateInput: 'YYYY',
			},
			display: {
				dateInput: 'YYYY',
				monthYearLabel: 'MMM YYYY',
				dateA11yLabel: 'LL',
				monthYearA11yLabel: 'MMMM YYYY',
			},
		});
	});
});
