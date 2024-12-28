import { ButtonsListComponent } from "src/app/shared/components/buttons-list/buttons-list.component";
import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";
import { hasCreatedComponent } from "src/app/testing/utils/has-created-component";
import { ComponentInputs } from "src/app/shared/models/component-inputs";
import { getByTestId } from "src/app/testing/getters/get-by-test-id";
import { changeInput as untypedChangeInput } from "src/app/testing/core/change-input";
import { Button } from "src/app/shared/components/button/models/button";
import { getAllByTestId } from "src/app/testing/getters/get-all-by-test-id";

const changeInput = untypedChangeInput<ButtonsListComponent>;

interface SetupConfig {
	inputs?: Partial<ComponentInputs<ButtonsListComponent>>;
}

const setup = (config?: SetupConfig) => {
	const inputs = {
		actions: [],
		...config?.inputs,
	}

	setupComponentTesting(ButtonsListComponent, {
		inputs
	})
}


fdescribe(ButtonsListComponent.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	describe('[gap] input', () => {
		describe('When not provided', () => {
			it('must render a row with [gap] 1rem', () => {
				setup();

				const row = getByTestId('row');

				expect(row.getProperty("gap")).toBe("1rem");
			});
		});

		describe('When provided', () => {
			it('must render a row with [gap] provided by input', () => {
				setup({
					inputs: {
						gap: "5rem"
					}
				});

				const row = getByTestId('row');

				expect(row.getProperty("gap")).toBe("5rem");
			});
		});

		describe('When changes', () => {
			it('row gap must be updated with gap provided', () => {
				setup();

				const row = getByTestId('row');

				changeInput('gap', '20rem');
				expect(row.getProperty("gap")).toBe("20rem");

				changeInput('gap', '50rem');
				expect(row.getProperty("gap")).toBe("50rem");
			});
		});
	});

	describe('[alignment] input', () => {
		describe('When not provided', () => {
			it('must render a row with [verticalAlignment] flex-start', () => {
				setup();

				const row = getByTestId('row');

				expect(row.getProperty("verticalAlignment")).toBe("flex-start");
			});
		});

		describe('When provided', () => {
			it('must render a row with [verticalAlignment] provided by input', () => {
				setup({
					inputs: {
						alignment: "center"
					}
				});

				const row = getByTestId('row');

				expect(row.getProperty("verticalAlignment")).toBe("center");
			});
		});

		describe('When changes', () => {
			it('row [verticalAlignment] must be updated with [alignment] input', () => {
				setup();

				const row = getByTestId('row');

				changeInput('alignment', 'flex-start');
				expect(row.getProperty("verticalAlignment")).toBe("flex-start");

				changeInput('alignment', 'center');
				expect(row.getProperty("verticalAlignment")).toBe("center");

				changeInput('alignment', 'flex-end');
				expect(row.getProperty("verticalAlignment")).toBe("flex-end");

				changeInput('alignment', 'space-between');
				expect(row.getProperty("verticalAlignment")).toBe("space-between");
			});
		});
	});

	describe('[actions] input', () => {
		it('must render a list of buttons with properties provided by [actions] input', () => {
			const actions: Button[] = [
				{
					relativeRoute: "some-relative-route-1",
					label: "Some label 1",
					disabled: false,
					iconColor: "red",
					icon: "some-icon-1",
					tooltip: "Some tooltip 1",
					type: "raised"
				},
				{
					relativeRoute: "some-relative-route-2",
					label: "Some label 2",
					disabled: true,
					iconColor: "blue",
					icon: "some-icon-2",
					tooltip: "Some tooltip 2",
					type: "stroked"
				},
				{
					relativeRoute: "some-relative-route-3",
					label: "Some label 1",
					disabled: false,
					iconColor: "primary",
					icon: "some-icon-3",
					tooltip: "Some tooltip 3",
					type: "icon"
				},
			];

			setup({
				inputs: {
					actions
				}
			});


			const buttons = getAllByTestId('button');

			actions.forEach((button, index) => {
				const element = buttons[index];

				expect(element.getProperty('routerLink')).toBe(button.relativeRoute);
				expect(element.getProperty('label')).toBe(button.label);
				expect(element.getProperty('disabled')).toBe(button.disabled);
				expect(element.getProperty('color')).toBe(button.iconColor);
				expect(element.getProperty('icon')).toBe(button.icon);
				expect(element.getProperty('tooltip')).toBe(button.tooltip);
				expect(element.getProperty('type')).toBe(button.type);
			})
		});

		describe('When button click', () => {
			it('must call action click when button clicked', () => {
				const click = jest.fn();

				const actions: Button[] = [
					{
						relativeRoute: "some-relative-route-1",
						label: "Some label 1",
						disabled: false,
						iconColor: "red",
						icon: "some-icon-1",
						tooltip: "Some tooltip 1",
						type: "raised",
						click
					},
				];

				setup({
					inputs: {
						actions
					}
				});

				const button = getByTestId('button');
				button.triggerEventHandler('click');

				expect(click).toHaveBeenCalledExactlyOnceWith();
			});
		});

		describe('When button finish loading', () => {
			describe('and result is success', () => {
				it('must call afterLoadingSuccess', () => {
					const afterLoadingSuccess = jest.fn();

					const actions: Button[] = [
						{
							relativeRoute: "some-relative-route-1",
							label: "Some label 1",
							disabled: false,
							iconColor: "red",
							icon: "some-icon-1",
							tooltip: "Some tooltip 1",
							type: "raised",
							afterLoadingSuccess
						},
					];

					setup({
						inputs: {
							actions
						}
					});

					const button = getByTestId('button');
					button.triggerEventHandler('finishLoading', 'success');

					expect(afterLoadingSuccess).toHaveBeenCalledExactlyOnceWith('success');
				});
			});

			describe('and result is no-request', () => {
				it('must call afterLoadingSuccess', () => {
					const afterLoadingSuccess = jest.fn();

					const actions: Button[] = [
						{
							relativeRoute: "some-relative-route-1",
							label: "Some label 1",
							disabled: false,
							iconColor: "red",
							icon: "some-icon-1",
							tooltip: "Some tooltip 1",
							type: "raised",
							afterLoadingSuccess
						},
					];

					setup({
						inputs: {
							actions
						}
					});

					const button = getByTestId('button');
					button.triggerEventHandler('finishLoading', 'no-request');

					expect(afterLoadingSuccess).toHaveBeenCalledExactlyOnceWith('no-request');
				});
			});

			describe('and result is error', () => {
				it('must call afterLoadingSuccess', () => {
					const afterLoadingError = jest.fn();

					const actions: Button[] = [
						{
							relativeRoute: "some-relative-route-1",
							label: "Some label 1",
							disabled: false,
							iconColor: "red",
							icon: "some-icon-1",
							tooltip: "Some tooltip 1",
							type: "raised",
							afterLoadingError
						},
					];

					setup({
						inputs: {
							actions
						}
					});

					const button = getByTestId('button');
					button.triggerEventHandler('finishLoading', 'error');

					expect(afterLoadingError).toHaveBeenCalledExactlyOnceWith();
				});
			});
		});

	});
});
