import { setupComponentTesting } from "../../../testing/setup/setup-component-testing";
import { expect, fdescribe } from "@jest/globals";
import { Component } from "@angular/core";
import { getByTestId } from "../../../testing/getters/get-by-test-id";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { hasCreatedComponent } from "../../../testing/utils/has-created-component";
import { YearFormatDirective } from "./year-format.directive";

interface SetupConfig {

}

const setup = (config?: SetupConfig) => {
	@Component({
		template: `
			<div data-test-id="child" appYearFormat>
			</div>
		`,
		selector: "app-root-test",
		imports: [
			YearFormatDirective
		]
	})
	class HostComponent {

	}

	setupComponentTesting(HostComponent, {
		imports: [YearFormatDirective],
	})
}


fdescribe(YearFormatDirective.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	it('must provide a MAT_DATE_LOCALE with correct year format', () => {
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
