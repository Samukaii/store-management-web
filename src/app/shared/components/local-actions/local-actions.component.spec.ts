import { LocalActionsComponent } from "src/app/shared/components/local-actions/local-actions.component";
import { hasCreatedComponent } from "src/app/testing/utils/has-created-component";
import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";
import { Button } from "src/app/shared/components/button/models/button";
import { DeepPartial } from "src/app/shared/models/deep-partial";
import { MockProvider } from "ng-mocks";
import { LocalActionsService } from "src/app/shared/components/local-actions/local-actions.service";
import { computed } from "@angular/core";
import { getByTestId } from "src/app/testing/getters/get-by-test-id";

interface SetupConfig {
	actions?: Record<string, DeepPartial<Button>[]>
}

const setup = (config?: SetupConfig) => {
	return setupComponentTesting(LocalActionsComponent, {
		providers: [
			MockProvider(LocalActionsService, {
				getActions: (where: string) => {
					const actions = config?.actions ?? {};

					return computed(() => actions[where] ?? []);
				}
			})
		],
		inputs: {
			where: "tab"
		}
	})
}


describe(LocalActionsComponent.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	describe('Host style', () => {
		it('padding must be 0 when no actions was registered', () => {
			const {getStyle} = setup();

			expect(getStyle("padding")).toBe("0px");
		});

		it('padding must be .5rem 1rem when some action is registered', () => {
			const {getStyle} = setup({
				actions: {
					tab: [
						{name: "Some action"},
					]
				}
			});

			expect(getStyle("padding")).toBe(".5rem 1rem");
		});
	});

	describe('Buttons list', () => {
		it('[alignment] must be "flex-end"', () => {
			setup();

			const element = getByTestId('buttons-list');

			expect(element.getProperty("alignment")).toBe('flex-end');
		});

		it('must receive correct actions when [where] input changes', () => {
			const {changeInput} = setup({
				actions: {
					tab: [
						{name: "Tab action"},
					],
					"top-bar": [
						{name: "Top bar action"},
					],
					"other-location": [
						{name: "Other location action"},
					],
				}
			});

			const element = getByTestId('buttons-list');

			changeInput("where", 'tab');

			expect(element.getProperty("actions")).toEqual([
				{name: "Tab action"},
			]);

			changeInput("where", 'top-bar');

			expect(element.getProperty("actions")).toEqual([
				{name: "Top bar action"},
			]);

			changeInput("where", 'other-location');

			expect(element.getProperty("actions")).toEqual([
				{name: "Other location action"},
			]);
		});
	});
});
