import { DatePickerComponent } from "src/app/shared/components/date-picker/date-picker.component";
import { hasCreatedComponent } from "src/app/testing/utils/has-created-component";
import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";
import { FormControl, NgControl, ReactiveFormsModule } from "@angular/forms";
import { getByTestId } from "src/app/testing/getters/get-by-test-id";
import { testInputElement } from "src/app/testing/utils/test-input-element";
import { MatDatepicker } from "@angular/material/datepicker";
import { mockComponent } from "src/app/testing/mocks/mock-component";
import moment from "moment";

interface SetupConfig {
	control?: FormControl;
}

const setup = (config?: SetupConfig) => {
	return setupComponentTesting(DatePickerComponent, {
		imports: [
			ReactiveFormsModule,
			mockComponent(MatDatepicker, {
				properties: {
					close: () => {}
				}
			}),
		],
		inputs: {
			control: config?.control ?? new FormControl()
		}
	})
}


describe(DatePickerComponent.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	beforeEach(() => {
		jest.useFakeTimers();
		jest.setSystemTime(new Date("2025-01-02T23:32:11.000Z"));
	})

	afterEach(() => {
		jest.useRealTimers();
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

	describe('Input element', () => {
		it('must has the matInput directive', () => {
			setup();

			const input = getByTestId('input');

			expect(input.getProperty("matInput")).toBe("");
		});

		it('must receive control from input', () => {
			const {changeInput} = setup();

			const input = getByTestId('input');

			const firstControl = new FormControl();
			const secondControl = new FormControl();
			const thirdControl = new FormControl();

			changeInput('control', firstControl);
			expect(input.read(NgControl)?.control).toBe(firstControl);

			changeInput('control', secondControl);
			expect(input.read(NgControl)?.control).toBe(secondControl);

			changeInput('control', thirdControl);
			expect(input.read(NgControl)?.control).toBe(thirdControl);
		});

		it('must update control with input value when changes', () => {
			const control = new FormControl();

			setup({control});

			const input = testInputElement('input');

			input.write("22/12/2012");
			expect(control.value).toBe("22/12/2012");

			input.write("2012-12-13");
			expect(control.value).toBe("2012-12-13");

			input.write("12-13-2016");
			expect(control.value).toBe("12-13-2016");
		});

		it('must pass datepicker directive as [matDatepicker]', () => {
			setup();

			const input = getByTestId('input');
			const datepicker = getByTestId('datepicker');

			expect(input.getProperty("matDatepicker")).toBe(datepicker.read(MatDatepicker));
		});
	});

	describe('Datepicker toggle', () => {
		it('must has the matIconSuffix directive', () => {
			setup();

			const input = getByTestId('toggle');

			expect(input.getProperty("matIconSuffix")).toBe("");
		});

		it('must pass datepicker directive as [for]', () => {
			setup();

			const input = getByTestId('toggle');
			const datepicker = getByTestId('datepicker');

			expect(input.getProperty("for")).toBe(datepicker.read(MatDatepicker));
		});
	});

	describe('Datepicker', () => {
		const parseableToTrueValues = [
			true,
			"",
			"Some truthy string"
		];

		const parseableToFalseValues = [
			false,
			null,
			undefined,
			"false",
		];

		it('must update [startView] with input value when [startView] changes', () => {
			const {changeInput} = setup();

			const element = getByTestId('datepicker');

			changeInput("startView", "month");
			expect(element.getProperty("startView")).toBe("month");

			changeInput("startView", "year");
			expect(element.getProperty("startView")).toBe("year");

			changeInput("startView", "multi-year");
			expect(element.getProperty("startView")).toBe("multi-year");
		});

		describe('When month is selected', () => {
			parseableToTrueValues.forEach(value => {
				describe(`and [closeOnMonthSelect] is "${value}", which is parseable to true via booleanAttribute`, () => {
					it('must update control with current date and selected year and month if control has no value', () => {
						const control = new FormControl();

						const {changeInput} = setup({control});

						changeInput('closeOnMonthSelect', value as never);

						const element = getByTestId('datepicker');
						const date = moment("2027-08-15T23:24:16.000Z");

						element.triggerEventHandler('monthSelected', date);

						expect(control.value.toISOString()).toBe(moment("2027-08-02T23:32:11.000Z").toISOString());
					});

					it('must update control with current date value and selected year and month if control has value', () => {
						const control = new FormControl(new Date("2022-09-30T11:50:13.000Z"));

						const {changeInput} = setup({control});

						changeInput('closeOnMonthSelect', value as never);

						const element = getByTestId('datepicker');
						const date = moment("2027-08-15T23:24:16.000Z");

						element.triggerEventHandler('monthSelected', date);

						expect(control.value?.toISOString()).toBe(moment("2027-08-30T11:50:13.000Z").toISOString());
					});

					it('must close date picker', () => {
						const {changeInput} = setup();

						changeInput('closeOnMonthSelect', value as never);

						const element = getByTestId('datepicker');
						const directive = getByTestId('datepicker').read(MatDatepicker)!;

						const close = jest.spyOn(directive, 'close');

						const date = moment("2027-08-15T23:24:16.000Z");

						element.triggerEventHandler('monthSelected', date);

						expect(close).toHaveBeenCalledExactlyOnceWith();
					});
				});
			})

			parseableToFalseValues.forEach(value => {
				describe(`and [closeOnMonthSelect] is "${value}", which is parseable to false via booleanAttribute`, () => {
					it('must not update control value when has no value', () => {
						const control = new FormControl();

						const {changeInput} = setup({control});

						changeInput('closeOnMonthSelect', value as never);

						const element = getByTestId('datepicker');
						const date = moment("2027-08-15T23:24:16.000Z");

						element.triggerEventHandler('monthSelected', date);

						expect(control.value).toBe(null);
					});

					it('must not update control when has value', () => {
						const control = new FormControl(new Date("2022-09-30T11:50:13.000Z"));

						const {changeInput} = setup({control});

						changeInput('closeOnMonthSelect', value as never);

						const element = getByTestId('datepicker');
						const date = moment("2027-08-15T23:24:16.000Z");

						element.triggerEventHandler('monthSelected', date);

						expect(control.value?.toISOString()).toBe(new Date("2022-09-30T11:50:13.000Z").toISOString());
					});

					it('must not close date picker', () => {
						const {changeInput} = setup();

						changeInput('closeOnMonthSelect', value as never);

						const element = getByTestId('datepicker');
						const directive = getByTestId('datepicker').read(MatDatepicker)!;

						const close = jest.spyOn(directive, 'close');

						const date = moment("2027-08-15T23:24:16.000Z");

						element.triggerEventHandler('monthSelected', date);

						expect(close).not.toHaveBeenCalled();
					});
				});
			})
		});

		describe('When year is selected', () => {
			parseableToTrueValues.forEach(value => {
				describe(`and [closeOnYearSelect] is "${value}", which is parseable to true via booleanAttribute`, () => {
					it('must update control with current date and selected year if control has no value', () => {
						const control = new FormControl();

						const {changeInput} = setup({control});

						changeInput('closeOnYearSelect', value as never);

						const element = getByTestId('datepicker');
						const date = moment("2027-08-15T23:24:16.000Z");

						element.triggerEventHandler('yearSelected', date);

						expect(control.value.toISOString()).toBe(moment("2027-01-02T23:32:11.000Z").toISOString());
					});

					it('must update control with current date value and selected year if control has value', () => {
						const control = new FormControl(new Date("2022-09-30T11:50:13.000Z"));

						const {changeInput} = setup({control});

						changeInput('closeOnYearSelect', value as never);

						const element = getByTestId('datepicker');
						const date = moment("2027-08-15T23:24:16.000Z");

						element.triggerEventHandler('yearSelected', date);

						expect(control.value?.toISOString()).toBe(moment("2027-09-30T11:50:13.000Z").toISOString());
					});

					it('must close date picker', () => {
						const {changeInput} = setup();

						changeInput('closeOnYearSelect', value as never);

						const element = getByTestId('datepicker');
						const directive = getByTestId('datepicker').read(MatDatepicker)!;

						const close = jest.spyOn(directive, 'close');

						const date = moment("2027-08-15T23:24:16.000Z");

						element.triggerEventHandler('yearSelected', date);

						expect(close).toHaveBeenCalledExactlyOnceWith();
					});
				});
			})

			parseableToFalseValues.forEach(value => {
				describe(`and [closeOnYearSelect] is "${value}", which is parseable to false via booleanAttribute`, () => {
					it('must not update control value when has no value', () => {
						const control = new FormControl();

						const {changeInput} = setup({control});

						changeInput('closeOnYearSelect', value as never);

						const element = getByTestId('datepicker');
						const date = moment("2027-08-15T23:24:16.000Z");

						element.triggerEventHandler('yearSelected', date);

						expect(control.value).toBe(null);
					});

					it('must not update control when has value', () => {
						const control = new FormControl(new Date("2022-09-30T11:50:13.000Z"));

						const {changeInput} = setup({control});

						changeInput('closeOnYearSelect', value as never);

						const element = getByTestId('datepicker');
						const date = moment("2027-08-15T23:24:16.000Z");

						element.triggerEventHandler('yearSelected', date);

						expect(control.value?.toISOString()).toBe(new Date("2022-09-30T11:50:13.000Z").toISOString());
					});

					it('must not close date picker', () => {
						const {changeInput} = setup();

						changeInput('closeOnYearSelect', value as never);

						const element = getByTestId('datepicker');
						const directive = getByTestId('datepicker').read(MatDatepicker)!;

						const close = jest.spyOn(directive, 'close');

						const date = moment("2027-08-15T23:24:16.000Z");

						element.triggerEventHandler('yearSelected', date);

						expect(close).not.toHaveBeenCalled();
					});
				});
			})
		});
	});
});
