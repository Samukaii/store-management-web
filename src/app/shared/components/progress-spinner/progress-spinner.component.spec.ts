import { ProgressSpinnerComponent } from "src/app/shared/components/progress-spinner/progress-spinner.component";
import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";
import { hasCreatedComponent } from "src/app/testing/utils/has-created-component";
import { fixtureUtils } from "src/app/testing/utils/fixture-utils";
import { getByTestId } from "src/app/testing/getters/get-by-test-id";
import { mockComponent } from "src/app/testing/mocks/mock-component";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { findByTestId } from "src/app/testing/getters/find-by-test-id";


const setup = () => {
	setupComponentTesting(ProgressSpinnerComponent, {
		imports: [
			mockComponent(MatProgressSpinner)
		]
	});

	return fixtureUtils<ProgressSpinnerComponent>();
}

describe(ProgressSpinnerComponent.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	it('must show a spinner with properties provided by input', () => {
		const {changeInput} = setup();

		const spinner = getByTestId('spinner');

		expect(spinner.read(MatProgressSpinner)).toBeTruthy();

		changeInput('mode', 'determinate');
		expect(spinner.getProperty('mode')).toBe('determinate');

		changeInput('mode', 'indeterminate');
		expect(spinner.getProperty('mode')).toBe('indeterminate');

		changeInput('strokeWidth', 5464);
		expect(spinner.getProperty('strokeWidth')).toBe(5464);

		changeInput('diameter', 6754);
		expect(spinner.getProperty('diameter')).toBe(6754);
	});

	describe('[text] input', () => {
		it('must not render text if not provided', () => {
			const {changeInput} = setup();

			changeInput('text', undefined);

			const text = findByTestId('text');

			expect(text).toBeFalsy();
		});

		it('must render input when provided with given text', () => {
			const {changeInput} = setup();

			changeInput('text', 'Some text');

			const element = getByTestId('text');

			expect(element.text()).toBe('Some text');

			changeInput('text', 'Other text');

			expect(element.text()).toBe('Other text');
		});
	});
});
