import { NoResultsComponent } from "src/app/shared/components/no-results/no-results.component";
import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";
import { hasCreatedComponent } from "src/app/testing/utils/has-created-component";
import { getByTestId } from "src/app/testing/getters/get-by-test-id";
import { fixtureUtils } from "src/app/testing/utils/fixture-utils";
import { findByTestId } from "src/app/testing/getters/find-by-test-id";


const setup = () => {
	setupComponentTesting(NoResultsComponent, {
		inputs: {
			icon: "",
			label: "",
		}
	});

	return fixtureUtils<NoResultsComponent>();
}

describe(NoResultsComponent.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	it('must show icon provided by [icon] input', () => {
		const {changeInput} = setup();

		const icon = getByTestId('icon');

		changeInput('icon', 'some-icon');
		expect(icon.text()).toBe('some-icon');

		changeInput('icon', 'other-icon');
		expect(icon.text()).toBe('other-icon');
	});

	it('must show label provided by [label] input', () => {
		const {changeInput} = setup();

		const label = getByTestId('label');

		changeInput('label', 'Some label');
		expect(label.text()).toBe('Some label');

		changeInput('label', 'Other label');
		expect(label.text()).toBe('Other label');
	});

	describe('[description] input', () => {
		it('must not show description if not provided', () => {
			const {changeInput} = setup();

			changeInput('description', undefined);

			const description = findByTestId('description');

			expect(description).toBeFalsy();
		});

		it('must show description with provided input', () => {
			const {changeInput} = setup();

			changeInput('description', 'Some description');

			const description = getByTestId('description');

			expect(description.text()).toBe('Some description');

			changeInput('description', 'Other description');
			expect(description.text()).toBe('Other description');
		});
	});
});
