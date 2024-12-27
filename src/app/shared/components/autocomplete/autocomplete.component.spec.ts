import { AutocompleteComponent } from "src/app/shared/components/autocomplete/autocomplete.component";
import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";
import { hasCreatedComponent } from "src/app/testing/utils/has-created-component";
import { MockComponent, MockDirective } from "ng-mocks";
import { MatAutocomplete } from "@angular/material/autocomplete";
import { FormBuilder, FormControl, NgControl, ReactiveFormsModule } from "@angular/forms";
import { of } from "rxjs";
import { AutocompleteOption } from "src/app/shared/components/autocomplete/models/autocomplete-option";
import { changeInput } from "src/app/testing/core/change-input";
import { ComponentInputs } from "src/app/shared/models/component-inputs";
import { ComponentInputValue } from "src/app/shared/models/component-input-value";
import { getByTestId } from "src/app/testing/getters/get-by-test-id";
import { valueType } from "src/app/shared/helpers/value-type/value-type";
import { fakeAsync, flush } from "@angular/core/testing";
import { ProgressSpinnerComponent } from "src/app/shared/components/progress-spinner/progress-spinner.component";
import { detectChanges } from "src/app/testing/utils/detect-changes";
import { mockComponent } from "src/app/testing/mocks/mock-component";
import { findAllByTestId } from "src/app/testing/getters/find-all-by-test-id";
import { findByTestId } from "src/app/testing/getters/find-by-test-id";
import { NoResultsAction } from "src/app/shared/components/autocomplete/models/no-results-action";
import { ButtonComponent } from "src/app/shared/components/button/button.component";
import { MatError } from "@angular/material/form-field";
import { testInputElement } from "src/app/testing/utils/test-input-element";
import { getCurrentComponentFixture } from "src/app/testing/core/current-component-fixture";
import { destroyCurrentComponent } from "src/app/testing/core/destroy-current-component";
import { NoResultsActionsFn } from "src/app/shared/components/autocomplete/models/no-results-actions-fn";
import { GlobalErrorDirective } from "src/app/shared/directives/global-error/global-error.directive";
import { mockErrorsService } from "src/app/testing/mocks/mock-errors-service";
import { injectDep } from "src/app/testing/utils/inject-dep";
import { ErrorsService } from "src/app/core/error-handling/errors.service";

interface SetupConfig {
	data?: AutocompleteOption[];
	noResults?: NoResultsAction | NoResultsActionsFn;
	method?: jest.Mock;
	key?: string;
	control?: FormControl;
}

const mockElementRef = () => {
	const field = getCurrentComponentFixture().debugElement.injector.get(GlobalErrorDirective);

	const nativeElement = {
		scrollIntoView: jest.fn()
	}

	field!['elementRef'].nativeElement = nativeElement;

	return nativeElement;
}

const validateRenderedItems = (expectedItems: AutocompleteOption[]) => {
	const items = findAllByTestId('option');

	expect(items.length).toBe(expectedItems.length);

	expectedItems.forEach((expectedItem, index) => {
		const item = items[index];

		expect(item.getProperty('value')).toEqual(expectedItem);
		expect(item.text()).toBe(expectedItem.name);
	});
}

const validateNoResults = (options: {message: string; icon: string}) => {
	const noResults = getByTestId('no-results');
	const button = noResults.getByDirective(ButtonComponent);

	expect(button.getProperty("type")).toBe('icon');
	expect(button.getProperty("color")).toBe('blue');
	expect(button.getProperty("icon")).toBe(options.icon);
	expect(noResults.getByTestId('message').text()).toBe(options.message);
}

const setup = (config?: SetupConfig) => {
	const form = new FormBuilder().group({
		categoryId: valueType<number>()
	});

	const method = jest.fn().mockReturnValue(of(config?.data ?? []));

	setupComponentTesting(AutocompleteComponent, {
		inputs: {
			control: config?.control ?? form.controls.categoryId,
			method: config?.method ?? method,
			label: "",
			key: config?.key ?? "id",
			placeholder: "",
			noResults: config?.noResults ?? {message: ""}
		},
		providers: [
			mockErrorsService(),
		],
		imports: [
			MockComponent(MatAutocomplete),
			mockComponent(ButtonComponent),
			MockDirective(MatError),
			mockComponent(ProgressSpinnerComponent),
			ReactiveFormsModule,
		]
	});

	return {
		elementRef: mockElementRef(),
		method,
		changeInput: <Key extends keyof ComponentInputs<AutocompleteComponent>>(key: Key, value: ComponentInputValue<AutocompleteComponent, Key>) => {
			changeInput(key, value);
		}
	}
}


describe(AutocompleteComponent.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	it('must show a label with value passed as input', () => {
		const {changeInput} = setup();

		const label = getByTestId('label');

		changeInput('label', "Some label");
		expect(label.text()).toBe('Some label');

		changeInput('label', "Other label");
		expect(label.text()).toBe('Other label');
	});

	it('must update input placeholder value passed as input', () => {
		const {changeInput} = setup();

		const input = getByTestId('input');

		changeInput('placeholder', "Some placeholder");
		expect(input.getProperty('placeholder')).toBe('Some placeholder');

		changeInput('placeholder', "Other placeholder");
		expect(input.getProperty('placeholder')).toBe('Other placeholder');
	});

	describe('Request flow', () => {
		const expectedItems = [
			{id: 1, name: "Option 1"},
			{id: 2, name: "Option 2"},
			{id: 3, name: "Option 3"},
		]

		it('must call method with empty params on start', () => {
			const {method} = setup();

			expect(method).toHaveBeenCalledExactlyOnceWith({});
		});

		describe('While requesting', () => {
			it('must show loading', fakeAsync(() => {
				setup({data: expectedItems});

				const loading = getByTestId('loading');

				expect(loading).toBeTruthy();
			}));

			it('must not show data', fakeAsync(() => {
				setup({data: expectedItems});

				validateRenderedItems([]);
			}));

			it('must not show no results', fakeAsync(() => {
				setup({data: expectedItems});

				const noResults = findByTestId('no-results');

				expect(noResults).toBeFalsy();
			}));
		});

		describe('After finished with data', () => {
			it('must not show loading', fakeAsync(() => {
				setup({data: expectedItems});

				flush();
				detectChanges();

				const loading = findByTestId('loading');

				expect(loading).toBeFalsy();
			}));

			it('must show data', fakeAsync(() => {
				setup({data: expectedItems});

				flush();
				detectChanges();

				validateRenderedItems(expectedItems);
			}));

			it('must not show no results', fakeAsync(() => {
				setup({data: expectedItems});

				flush();
				detectChanges();

				const noResults = findByTestId('no-results');

				expect(noResults).toBeFalsy();
			}));
		});

		describe('After finished with no data', () => {
			it('must not show loading', fakeAsync(() => {
				setup({data: []});

				flush();
				detectChanges();

				const loading = findByTestId('loading');

				expect(loading).toBeFalsy();
			}));

			it('must not show data', fakeAsync(() => {
				setup({data: []});

				flush();
				detectChanges();

				validateRenderedItems([]);
			}));

			it('must show no results', fakeAsync(() => {
				setup({data: []});

				flush();
				detectChanges();

				const noResults = getByTestId('no-results');

				expect(noResults).toBeTruthy();
			}));
		});
	});

	describe('When control passed as input is updated', () => {
		describe('and [key] input is default', () => {
			it('must call method with object containing id:equal with control value if is not at listed options', fakeAsync(() => {
				const form = new FormBuilder().group({
					categoryId: valueType<number>()
				});

				const {method} = setup({
					data: [
						{id: 21, name: 'Option 1'},
						{id: 45, name: 'Option 2'},
						{id: 12, name: 'Option 3'},
					],
					control: form.controls.categoryId
				});

				flush();
				detectChanges();

				method.mockClear();

				form.controls.categoryId.setValue(34);

				expect(method).toHaveBeenCalledWith({
					'id:equal': 34
				});
				expect(method).toHaveBeenCalledTimes(1);
			}));

			it('input value must be updated with name given by method call first option', fakeAsync(() => {
				const form = new FormBuilder().group({
					categoryId: valueType<number>()
				});

				const {method} = setup({
					data: [
						{id: 21, name: 'Option 1'},
						{id: 45, name: 'Option 2'},
						{id: 12, name: 'Option 3'},
					],
					control: form.controls.categoryId,
				});

				flush();
				detectChanges();

				method.mockReturnValue(of([
					{id: 34, name: 'Option 4'},
					{id: 76, name: 'Option 5'},
					{id: 22, name: 'Option 6'},
				]))

				form.controls.categoryId.setValue(34);

				const input = getByTestId('input').read(NgControl)!;

				expect(input.control?.value).toBe('Option 4');
			}));

			it('must not call method again if control value is at listed options', fakeAsync(() => {
				const form = new FormBuilder().group({
					categoryId: valueType<number>()
				});

				const {method} = setup({
					data: [
						{id: 21, name: 'Option 1'},
						{id: 45, name: 'Option 2'},
						{id: 12, name: 'Option 3'},
					],
					control: form.controls.categoryId
				});

				flush();
				detectChanges();

				method.mockClear();

				form.controls.categoryId.setValue(21);

				expect(method).not.toHaveBeenCalled();
			}));
		});

		describe('and [key] input is passed', () => {
			it('must call method with object containing [key passed]:equal with control value', fakeAsync(() => {
				const form = new FormBuilder().group({
					categoryId: valueType<number>()
				});

				const {method} = setup({
					data: [
						{id: 21, name: 'Option 1'},
						{id: 45, name: 'Option 2'},
						{id: 12, name: 'Option 3'},
					],
					control: form.controls.categoryId,
					key: "some-custom-key"
				});

				flush();
				detectChanges();

				method.mockClear();

				form.controls.categoryId.setValue(34);

				expect(method).toHaveBeenCalledWith({
					'some-custom-key:equal': 34
				});
				expect(method).toHaveBeenCalledTimes(1);
			}));

			it('input value must be updated with name given by method call first option', fakeAsync(() => {
				const form = new FormBuilder().group({
					categoryId: valueType<number>()
				});

				const {method} = setup({
					data: [
						{id: 21, name: 'Option 1'},
						{id: 45, name: 'Option 2'},
						{id: 12, name: 'Option 3'},
					],
					control: form.controls.categoryId,
					key: "some-custom-key"
				});

				flush();
				detectChanges();

				method.mockReturnValue(of([
					{id: 34, name: 'Option 4'},
					{id: 76, name: 'Option 5'},
					{id: 22, name: 'Option 6'},
				]))

				form.controls.categoryId.setValue(34);

				const input = getByTestId('input').read(NgControl)!;

				expect(input.control?.value).toBe('Option 4');
			}));

			it('must not call method again if control value is at listed options', fakeAsync(() => {
				const form = new FormBuilder().group({
					categoryId: valueType<number>()
				});

				const {method} = setup({
					data: [
						{id: 21, name: 'Option 1'},
						{id: 45, name: 'Option 2'},
						{id: 12, name: 'Option 3'},
					],
					control: form.controls.categoryId,
					key: "some-custom-key"
				});

				flush();
				detectChanges();

				method.mockClear();

				form.controls.categoryId.setValue(21);

				expect(method).not.toHaveBeenCalled();
			}));
		});
	});

	describe('When user types something', () => {
		it('must call method with object containing name:search and input value', () => {
			const {method} = setup();

			method.mockClear();

			const input = testInputElement('input');

			input.write("New value");
			input.write("Other value");
			input.write("More other value");

			expect(method).toHaveBeenNthCalledWith(1, {"name:search": 'New value'});
			expect(method).toHaveBeenNthCalledWith(2, {"name:search": 'Other value'});
			expect(method).toHaveBeenNthCalledWith(3, {"name:search": 'More other value'});
			expect(method).toHaveBeenCalledTimes(3);
		});

		it('must update control to null when value is a string', () => {
			const form = new FormBuilder().group({
				categoryId: 34
			});

			setup({control: form.controls.categoryId});

			const input = testInputElement('input');

			input.write("New value");

			expect(form.controls.categoryId.value).toBe(null);
		});

		it('must not update control when value is not a string', () => {
			const form = new FormBuilder().group({
				categoryId: 34
			});

			setup({control: form.controls.categoryId});

			const input = testInputElement('input');

			input.write(435 as any);

			expect(form.controls.categoryId.value).toBe(34);
		});

		it('must update data with new calls', fakeAsync(() => {
			const {method} = setup();

			const results: AutocompleteOption[][] = [
				[{id: 1, name: "Option 1"}, {id: 2, name: "Option 2"}, {id: 3, name: "Option 3"}],
				[{id: 4, name: "Option 4"}, {id: 5, name: "Option 5"}, {id: 6, name: "Option 6"}],
				[{id: 7, name: "Option 7"}, {id: 8, name: "Option 8"}, {id: 9, name: "Option 9"}],
			]

			method
				.mockClear()
				.mockReturnValueOnce(of(results[0]))
				.mockReturnValueOnce(of(results[1]))
				.mockReturnValueOnce(of(results[2]))

			const input = testInputElement('input');

			input.write("New value");
			flush();
			detectChanges();
			validateRenderedItems(results[0]);

			input.write("Other value");
			flush();
			detectChanges();
			validateRenderedItems(results[1]);

			input.write("More other value");
			flush();
			detectChanges();
			validateRenderedItems(results[2]);
		}));
	});

	describe('When user selects an option', () => {
		describe('and option has value', () => {
			it('must update control value and mark as dirty with selected option', () => {
				const form = new FormBuilder().group({
					categoryId: valueType<number>()
				});

				setup({
					control: form.controls.categoryId,
				});

				const autocomplete = getByTestId('autocomplete');

				const $event = {
					option: {
						value: {
							id: 123,
							name: 'Option 1'
						}
					}
				}

				autocomplete.triggerEventHandler('optionSelected', $event);

				expect(form.controls.categoryId.value).toBe(123);
				expect(form.controls.categoryId.dirty).toBe(true);
			});

			it('must update input control with name given by the selected option', () => {
				const form = new FormBuilder().group({
					categoryId: valueType<number>()
				});

				setup({
					control: form.controls.categoryId,
				});

				const autocomplete = getByTestId('autocomplete');

				const $event = {
					option: {
						value: {
							id: 123,
							name: 'Option 341'
						}
					}
				}

				autocomplete.triggerEventHandler('optionSelected', $event);

				const input = getByTestId('input').read(NgControl)!.control!;

				expect(input.value).toBe("Option 341");
			});

			it('must not trigger new method calls', () => {
				const form = new FormBuilder().group({
					categoryId: valueType<number>()
				});

				const {method} = setup({
					control: form.controls.categoryId,
				});

				method.mockClear();

				const autocomplete = getByTestId('autocomplete');

				const $event = {
					option: {
						value: {
							id: 123,
							name: 'Option 341'
						}
					}
				}

				autocomplete.triggerEventHandler('optionSelected', $event);

				expect(method).not.toHaveBeenCalled();
			});

			it('must emit selected option', () => {
				setup();

				const component = getCurrentComponentFixture<AutocompleteComponent>().componentInstance;

				let emittedValue!: AutocompleteOption;

				component.select.subscribe(value => {
					emittedValue = value;
				});

				const autocomplete = getByTestId('autocomplete');

				const $event = {
					option: {
						value: {
							id: 123,
							name: 'Option 341'
						}
					}
				}

				autocomplete.triggerEventHandler('optionSelected', $event);

				expect(emittedValue).toEqual({
					id: 123,
					name: 'Option 341'
				});
			});
		});

		describe('and option has no value (Can happen if no results or loading option is clicked)', () => {
			it('must not update control value neither mark as dirty', () => {
				const form = new FormBuilder().group({
					categoryId: valueType<number>()
				});

				setup({
					control: form.controls.categoryId,
				});

				const autocomplete = getByTestId('autocomplete');

				const $event = {
					option: {
						value: null
					}
				}

				autocomplete.triggerEventHandler('optionSelected', $event);

				expect(form.controls.categoryId.value).toBe(null);
				expect(form.controls.categoryId.dirty).toBe(false);
			});

			it('must not update input control', () => {
				const form = new FormBuilder().group({
					categoryId: valueType<number>()
				});

				setup({
					control: form.controls.categoryId,
				});

				const autocomplete = getByTestId('autocomplete');

				const $event = {
					option: {
						value: null
					}
				}

				autocomplete.triggerEventHandler('optionSelected', $event);

				const input = getByTestId('input').read(NgControl)!.control!;

				expect(input.value).toBe(null);
			});

			it('must not trigger new method calls', () => {
				const form = new FormBuilder().group({
					categoryId: valueType<number>()
				});

				const {method} = setup({
					control: form.controls.categoryId,
				});

				method.mockClear();

				const autocomplete = getByTestId('autocomplete');

				const $event = {
					option: {
						value: null
					}
				}

				autocomplete.triggerEventHandler('optionSelected', $event);

				expect(method).not.toHaveBeenCalled();
			});

			it('must not emit selected option', () => {
				setup();

				const component = getCurrentComponentFixture<AutocompleteComponent>().componentInstance;

				let emittedValue!: AutocompleteOption;

				component.select.subscribe(value => {
					emittedValue = value;
				});

				const autocomplete = getByTestId('autocomplete');

				const $event = {
					option: {
						value: null
					}
				}

				autocomplete.triggerEventHandler('optionSelected', $event);

				expect(emittedValue).toBe(undefined);
			});
		});
	});

	describe('When global error changes', () => {
		it('input control errors must be synchronized with global error change', () => {
			const form = new FormBuilder().group({
				categoryId: 34
			});

			setup({control: form.controls.categoryId});

			const input = getByTestId('input').read(NgControl);
			const errorsService = injectDep(ErrorsService);

			errorsService.setErrors({
				categoryId: "Some error"
			});

			expect(input?.control?.errors).toEqual({
				customError: "Some error"
			});

			errorsService.setErrors({
				categoryId: "Some other error"
			});

			expect(input?.control?.errors).toEqual({
				customError: "Some other error"
			});
		});

		it('input scroll to element when global error change', () => {
			const form = new FormBuilder().group({
				categoryId: 34
			});

			const {elementRef} = setup({control: form.controls.categoryId});

			const errorsService = injectDep(ErrorsService);

			errorsService.setErrors({
				categoryId: "Some error"
			});

			expect(elementRef.scrollIntoView).toHaveBeenCalledWith(
				{ behavior: "smooth", block: "center" }
			)

			errorsService.setErrors({
				categoryId: "Some other error"
			});

			expect(elementRef.scrollIntoView).toHaveBeenCalledWith(
				{ behavior: "smooth", block: "center" }
			)

			expect(elementRef.scrollIntoView).toHaveBeenCalledTimes(2);
		});

		it('error changes must not trigger new method calls', () => {
			const form = new FormBuilder().group({
				categoryId: 34
			});

			const {method} = setup({control: form.controls.categoryId});

			method.mockClear();

			const errorsService = injectDep(ErrorsService);

			errorsService.setErrors({
				categoryId: "Some error"
			});

			errorsService.setErrors({
				categoryId: "Some other error"
			});

			errorsService.setErrors({
				categoryId: "More other error"
			});

			expect(method).not.toHaveBeenCalled();
		});

		describe('and component is destroyed', () => {
			it('must stop to synchronize errors', () => {
				const form = new FormBuilder().group({
					categoryId: 34
				});

				setup({control: form.controls.categoryId});

				const input = getByTestId('input').read(NgControl);
				const errorsService = injectDep(ErrorsService);

				destroyCurrentComponent();

				errorsService.setErrors({
					categoryId: "Some error"
				});

				expect(input?.control?.errors).toBe(null);

				errorsService.setErrors({
					categoryId: "Some other error"
				});

				expect(input?.control?.errors).toBe(null);
			});

			it('must stop scrolling', () => {
				const form = new FormBuilder().group({
					categoryId: 34
				});

				const {elementRef} = setup({control: form.controls.categoryId});

				const errorsService = injectDep(ErrorsService);

				destroyCurrentComponent();

				errorsService.setErrors({
					categoryId: "Some error"
				});

				errorsService.setErrors({
					categoryId: "Some other error"
				});

				errorsService.setErrors({
					categoryId: "More other error"
				});

				expect(elementRef.scrollIntoView).not.toHaveBeenCalled();
			});
		});
	});

	describe('When control passed as input gets some error', () => {
		it('input control errors must be synchronized with control passed as input', () => {
			const form = new FormBuilder().group({
				categoryId: 34
			});

			setup({control: form.controls.categoryId});

			const input = getByTestId('input').read(NgControl);

			form.controls.categoryId.setErrors({
				someError: "Some value"
			});

			expect(input?.control?.errors).toEqual({
				someError: "Some value"
			});

			form.controls.categoryId.setErrors({
				someOtherError: "Some other value"
			});

			expect(input?.control?.errors).toEqual({
				someOtherError: "Some other value"
			});
		});

		it('error changes must not trigger new method calls', () => {
			const form = new FormBuilder().group({
				categoryId: 34
			});

			const {method} = setup({control: form.controls.categoryId});

			method.mockClear();

			form.controls.categoryId.setErrors({
				someError: "Some value"
			});

			form.controls.categoryId.setErrors({
				someOtherError: "Some other value"
			});

			form.controls.categoryId.setErrors({
				someOtherError: "More other value"
			});

			expect(method).not.toHaveBeenCalled();
		});

		describe('and component is destroyed', () => {
			it('must stop to synchronize errors', () => {
				const form = new FormBuilder().group({
					categoryId: 34
				});

				setup({control: form.controls.categoryId});

				const input = getByTestId('input').read(NgControl);

				destroyCurrentComponent();

				form.controls.categoryId.setErrors({
					someError: "Some value"
				});

				expect(input?.control?.errors).toBe(null);

				form.controls.categoryId.setErrors({
					someOtherError: "Some other value"
				});

				expect(input?.control?.errors).toBe(null);
			});
		});
	});

	describe('No results behavior', () => {
		describe('When receives an object', () => {
			it('option [value] must be null', fakeAsync(() => {
				setup({
					noResults: {
						message: "No items found"
					}
				});

				flush();
				detectChanges();

				const noResults = getByTestId('no-results');

				expect(noResults.getProperty('value')).toBeNull();
			}));

			it('must be updated with correct info', fakeAsync(() => {
				setup({
					noResults: {
						message: "No items found",
						icon: "some-icon"
					}
				});

				flush();
				detectChanges();

				validateNoResults({
					message: "No items found",
					icon: "some-icon"
				});
			}));

			it('must call no results action when clicked', fakeAsync(() => {
				const action = jest.fn();

				setup({
					noResults: {
						message: "No items found",
						icon: "some-icon",
						action
					}
				});

				flush();
				detectChanges();

				const noResults = getByTestId('no-results');

				noResults.triggerEventHandler('click');

				expect(action).toHaveBeenCalledExactlyOnceWith();
			}));
		});

		describe('When receives a function', () => {
			it('must update noResults with dynamic value when search or control changes', fakeAsync(() => {
				const form = new FormBuilder().group({
					categoryId: null,
					otherControl: 5654
				});

				const {changeInput} = setup({
					control: form.controls.categoryId,
					noResults: (options) => {
						return {
							message: `${options.searchValue} -> ${options.control.value}`,
							icon: "some-icon"
						}
					}
				});

				flush();
				detectChanges();

				validateNoResults({
					message: "-> null",
					icon: "some-icon"
				});

				const input = testInputElement('input');

				input.write("Searching for specific item");

				flush();
				detectChanges();

				validateNoResults({
					message: "Searching for specific item -> null",
					icon: "some-icon"
				});

				changeInput("control", form.controls.otherControl);

				validateNoResults({
					message: "Searching for specific item -> 5654",
					icon: "some-icon"
				});
			}));

			it('must update data when reload is called', fakeAsync(() => {
				const form = new FormBuilder().group({
					categoryId: null,
					otherControl: 5654
				});

				let reload = () => {};

				const {method} = setup({
					control: form.controls.categoryId,
					noResults: (options) => {
						reload = options.reload;

						return {
							message: `${options.searchValue} -> ${options.control.value}`,
							icon: "some-icon"
						}
					}
				});

				flush();
				detectChanges();

				const expectedItems: AutocompleteOption[] = [
					{id: 13, name: "New reloaded option 1"},
					{id: 45, name: "New reloaded option 2"},
					{id: 834, name: "New reloaded option 3"},
				];

				method.mockClear().mockReturnValue(of(expectedItems));

				reload();

				detectChanges();
				flush();
				detectChanges();

				validateRenderedItems(expectedItems);
			}));
		});

	});

	describe('Loading behavior', () => {
		it('option [value] must be null', fakeAsync(() => {
			setup();

			const loading = getByTestId('loading');

			expect(loading.getProperty('value')).toBeNull();
		}));

		it('must show a spinner', fakeAsync(() => {
			setup();

			const loading = getByTestId('loading');

			expect(loading.getByDirective(ProgressSpinnerComponent)).toBeTruthy();
		}));
	});

	describe('Field error behavior', () => {
		it('must use directive matError', () => {
			setup();

			const fieldError = getByTestId('field-error');

			expect(fieldError.read(MatError)).toBeTruthy();
		});

		it('must pass control received as input', () => {
			const form = new FormBuilder().group({
				categoryId: valueType<number>()
			});

			setup({control: form.controls.categoryId});

			const fieldError = getByTestId('field-error');

			expect(fieldError.getProperty('control')).toBe(form.controls.categoryId);
		});
	});
});
