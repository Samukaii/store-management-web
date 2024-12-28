import { ChipsSelectorComponent } from "src/app/shared/components/chips-selector/chips-selector.component";
import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";
import { hasCreatedComponent } from "src/app/testing/utils/has-created-component";
import { fixtureUtils } from "src/app/testing/utils/fixture-utils";
import { AutocompleteOption } from "src/app/shared/components/autocomplete/models/autocomplete-option";
import { getAllByTestId } from "src/app/testing/getters/get-all-by-test-id";
import { detectChanges } from "src/app/testing/utils/detect-changes";
import { NG_VALUE_ACCESSOR } from "@angular/forms";


const setup = () => {
	setupComponentTesting(ChipsSelectorComponent, {});

	return fixtureUtils<ChipsSelectorComponent>();
}

fdescribe(ChipsSelectorComponent.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	it('must render a list of options provided by inputs', () => {
		const {changeInput} = setup();

		const options: AutocompleteOption[] = [
			{
				id: 123,
				name: "Option 1",
			},
			{
				id: 456,
				name: "Option 2",
			},
			{
				id: 54,
				name: "Option 3",
			},
		];

		changeInput('options', options);

		const elements = getAllByTestId('option');

		options.forEach((option, index) => {
			const element = elements[index];

			expect(element.getProperty('selectable')).toBe(false);
			expect(element.getProperty('value')).toEqual(option);
			expect(element.text()).toBe(option.name);
		});
	});

	describe('On option clicked', () => {
		it('must update [selected] property for the selected option', () => {
			const {changeInput} = setup();

			const options: AutocompleteOption[] = [
				{
					id: 123,
					name: "Option 1",
				},
				{
					id: 456,
					name: "Option 2",
				},
				{
					id: 54,
					name: "Option 3",
				},
			];

			changeInput('options', options);

			const elements = getAllByTestId('option');

			elements[2].click();
			detectChanges();

			expect(elements[0].getProperty('selected')).toBe(false);
			expect(elements[1].getProperty('selected')).toBe(false);
			expect(elements[2].getProperty('selected')).toBe(true);

			elements[1].click();
			detectChanges();

			expect(elements[0].getProperty('selected')).toBe(false);
			expect(elements[1].getProperty('selected')).toBe(true);
			expect(elements[2].getProperty('selected')).toBe(false);

			elements[0].click();
			detectChanges();

			expect(elements[0].getProperty('selected')).toBe(true);
			expect(elements[1].getProperty('selected')).toBe(false);
			expect(elements[2].getProperty('selected')).toBe(false);
		});

		it('must call registered on change and on touched callbacks', () => {
			const {read, changeInput} = setup();

			const options: AutocompleteOption[] = [
				{
					id: 123,
					name: "Option 1",
				},
				{
					id: 456,
					name: "Option 2",
				},
				{
					id: 54,
					name: "Option 3",
				},
			];

			changeInput('options', options);

			const accessor = read(NG_VALUE_ACCESSOR)?.[0];

			const onTouched = jest.fn();
			const onChange = jest.fn();

			accessor?.registerOnTouched(onTouched);
			accessor?.registerOnChange(onChange);

			const elements = getAllByTestId('option');

			elements[2].click();
			detectChanges();

			expect(onTouched).toHaveBeenCalledExactlyOnceWith();
			expect(onChange).toHaveBeenCalledExactlyOnceWith(54);
		});
	});

	describe('When accessor calls writeValue', () => {
		it('must update [selected] property for the selected option', () => {
			const {changeInput, valueAccessor} = setup();

			const options: AutocompleteOption[] = [
				{
					id: 123,
					name: "Option 1",
				},
				{
					id: 456,
					name: "Option 2",
				},
				{
					id: 54,
					name: "Option 3",
				},
			];

			changeInput('options', options);

			const elements = getAllByTestId('option');
			const accessor = valueAccessor();

			accessor?.writeValue(456);
			detectChanges();

			expect(elements[0].getProperty('selected')).toBe(false);
			expect(elements[1].getProperty('selected')).toBe(true);
			expect(elements[2].getProperty('selected')).toBe(false);

			accessor?.writeValue(54);
			detectChanges();

			expect(elements[0].getProperty('selected')).toBe(false);
			expect(elements[1].getProperty('selected')).toBe(false);
			expect(elements[2].getProperty('selected')).toBe(true);

			accessor?.writeValue(123);
			detectChanges();

			expect(elements[0].getProperty('selected')).toBe(true);
			expect(elements[1].getProperty('selected')).toBe(false);
			expect(elements[2].getProperty('selected')).toBe(false);

			accessor?.writeValue(764);
			detectChanges();

			expect(elements[0].getProperty('selected')).toBe(false);
			expect(elements[1].getProperty('selected')).toBe(false);
			expect(elements[2].getProperty('selected')).toBe(false);
		});

		it('must call registered on change and on touched callbacks', () => {
			const {changeInput, valueAccessor} = setup();

			const options: AutocompleteOption[] = [
				{
					id: 123,
					name: "Option 1",
				},
				{
					id: 456,
					name: "Option 2",
				},
				{
					id: 54,
					name: "Option 3",
				},
			];

			changeInput('options', options);

			const accessor = valueAccessor();

			const onTouched = jest.fn();
			const onChange = jest.fn();

			accessor?.registerOnTouched(onTouched);
			accessor?.registerOnChange(onChange);

			accessor?.writeValue(123);
			detectChanges();

			expect(onTouched).toHaveBeenCalledExactlyOnceWith();
			expect(onChange).toHaveBeenCalledExactlyOnceWith(123);
		});
	});
});
