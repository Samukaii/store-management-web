import { hasCreatedComponent } from "src/app/testing/utils/has-created-component";
import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";
import { FormControl, NgControl, ReactiveFormsModule } from "@angular/forms";
import { getByTestId } from "src/app/testing/getters/get-by-test-id";
import { testInputElement } from "src/app/testing/utils/test-input-element";
import { MatDateRangePicker } from "@angular/material/datepicker";
import { mockComponent } from "src/app/testing/mocks/mock-component";
import { DateRangeComponent } from "src/app/shared/components/date-range/date-range.component";

interface SetupConfig {
	startControl?: FormControl;
	endControl?: FormControl;
}

const setup = (config?: SetupConfig) => {
	return setupComponentTesting(DateRangeComponent, {
		imports: [
			ReactiveFormsModule,
			mockComponent(MatDateRangePicker, {
				properties: {
					close: () => {}
				}
			}),
		],
		inputs: {
			startControl: config?.startControl ?? new FormControl(),
			endControl: config?.endControl ?? new FormControl()
		}
	})
}


describe(DateRangeComponent.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	describe('Label element', () => {
		it('must update text with [label] input value', () => {
			const {changeInput} = setup();

			const element = getByTestId('label');

			changeInput("label", "Some label");
			expect(element.text()).toBe("Some label");

			changeInput("label", "Other label");
			expect(element.text()).toBe("Other label");

			changeInput("label", "Some other label");
			expect(element.text()).toBe("Some other label");
		});
	});

	describe('Date range input', () => {
		it('[rangePicker] must be date-range-picker directive', () => {
			setup();

			const rangeInput = getByTestId('range-input');
			const directive = getByTestId('date-range-picker').read(MatDateRangePicker)!;

			expect(rangeInput.getProperty("rangePicker")).toBe(directive);
		});
	});

	describe('Start input element', () => {
		it('must has the matStartDate directive', () => {
			setup();

			const input = getByTestId('start-input');

			expect(input.getProperty("matStartDate")).toBe("");
		});

		it('must receive [formControl] from [startControl] input', () => {
			const {changeInput} = setup();

			const input = getByTestId('start-input');

			const firstControl = new FormControl();
			const secondControl = new FormControl();
			const thirdControl = new FormControl();

			changeInput('startControl', firstControl);
			expect(input.read(NgControl)?.control).toBe(firstControl);

			changeInput('startControl', secondControl);
			expect(input.read(NgControl)?.control).toBe(secondControl);

			changeInput('startControl', thirdControl);
			expect(input.read(NgControl)?.control).toBe(thirdControl);
		});

		it('must update control with input value when changes', () => {
			const control = new FormControl();

			setup({startControl: control});

			const input = testInputElement('start-input');

			input.write("22/12/2012");
			expect(control.value).toBe("22/12/2012");

			input.write("2012-12-13");
			expect(control.value).toBe("2012-12-13");

			input.write("12-13-2016");
			expect(control.value).toBe("12-13-2016");
		});
	});

	describe('End input element', () => {
		it('must has the matStartDate directive', () => {
			setup();

			const input = getByTestId('end-input');

			expect(input.getProperty("matEndDate")).toBe("");
		});

		it('must receive [formControl] from [startControl] input', () => {
			const {changeInput} = setup();

			const input = getByTestId('end-input');

			const firstControl = new FormControl();
			const secondControl = new FormControl();
			const thirdControl = new FormControl();

			changeInput('endControl', firstControl);
			expect(input.read(NgControl)?.control).toBe(firstControl);

			changeInput('endControl', secondControl);
			expect(input.read(NgControl)?.control).toBe(secondControl);

			changeInput('endControl', thirdControl);
			expect(input.read(NgControl)?.control).toBe(thirdControl);
		});

		it('must update control with input value when changes', () => {
			const control = new FormControl();

			setup({endControl: control});

			const input = testInputElement('end-input');

			input.write("22/12/2012");
			expect(control.value).toBe("22/12/2012");

			input.write("2012-12-13");
			expect(control.value).toBe("2012-12-13");

			input.write("12-13-2016");
			expect(control.value).toBe("12-13-2016");
		});
	});

	describe('Date range picker toggle', () => {
		it('must has the matIconSuffix directive', () => {
			setup();

			const input = getByTestId('toggle');

			expect(input.getProperty("matIconSuffix")).toBe("");
		});

		it('must pass date range picker directive as [for]', () => {
			setup();

			const input = getByTestId('toggle');
			const directive = getByTestId('date-range-picker').read(MatDateRangePicker)!;

			expect(input.getProperty("for")).toBe(directive);
		});
	});
});
