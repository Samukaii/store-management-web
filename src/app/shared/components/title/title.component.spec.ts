import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";
import { hasCreatedComponent } from "src/app/testing/utils/has-created-component";
import { TitleComponent } from "src/app/shared/components/title/title.component";
import { ComponentInputs } from "src/app/shared/models/component-inputs";
import { getByTestId } from "src/app/testing/getters/get-by-test-id";
import { fixtureUtils } from "src/app/testing/utils/fixture-utils";

interface SetupConfig {
	inputs?: Partial<ComponentInputs<TitleComponent>>
}

const setup = (config?: SetupConfig) => {
	const inputs = {
		value: "",
		...config?.inputs,
	}

	setupComponentTesting(TitleComponent, {
		inputs
	});

	return fixtureUtils<TitleComponent>();
}


describe(TitleComponent.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	describe('When [size] is not provided', () => {
		it('must render medium title with value provided by input', () => {
			const {changeInput} = setup({
				inputs: {
					value: "Some value",
				}
			});

			const title = getByTestId('medium-title');

			expect(title.text()).toBe('Some value');

			changeInput('value', 'Some other value');

			expect(title.text()).toBe('Some other value');
		});
	});

	describe('When [size] is "small"', () => {
		it('must render small title with value provided by input', () => {
			const {changeInput} = setup({
				inputs: {
					value: "Some value",
					size: "small"
				}
			});

			const title = getByTestId('small-title');

			expect(title.text()).toBe('Some value');

			changeInput('value', 'Some other value');

			expect(title.text()).toBe('Some other value');
		});
	});

	describe('When [size] is "medium"', () => {
		it('must render medium title with value provided by input', () => {
			const {changeInput} = setup({
				inputs: {
					value: "Some value",
					size: "medium"
				}
			});

			const title = getByTestId('medium-title');

			expect(title.text()).toBe('Some value');

			changeInput('value', 'Some other value');

			expect(title.text()).toBe('Some other value');
		});
	});

	describe('When [size] is "large"', () => {
		it('must render large title with value provided by input', () => {
			const {changeInput} = setup({
				inputs: {
					value: "Some value",
					size: "large"
				}
			});

			const title = getByTestId('large-title');

			expect(title.text()).toBe('Some value');

			changeInput('value', 'Some other value');

			expect(title.text()).toBe('Some other value');
		});
	});
});
