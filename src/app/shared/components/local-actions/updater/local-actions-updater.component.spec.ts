import {
	LocalActionsUpdaterComponent
} from "src/app/shared/components/local-actions/updater/local-actions-updater.component";
import { hasCreatedComponent } from "src/app/testing/utils/has-created-component";
import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";
import { MockProvider } from "ng-mocks";
import { LocalActionsService } from "src/app/shared/components/local-actions/local-actions.service";
import { spyDependency } from "src/app/testing/spies/spy-dependency";
import { destroyCurrentComponent } from "src/app/testing/core/destroy-current-component";

const setup = () => {
	return setupComponentTesting(LocalActionsUpdaterComponent, {
		inputs: {
			where: "tab",
			actions: []
		},
		providers: [
			MockProvider(LocalActionsService)
		]
	})
}

describe(LocalActionsUpdaterComponent.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	describe('When [where] input changes', () => {
		it('must call update actions with new "where" and delete previous "where"', () => {
			const {changeInput} = setup();

			const updateActions = spyDependency(LocalActionsService, 'updateActions');
			const deleteActions = spyDependency(LocalActionsService, 'deleteActions');

			changeInput("where", "first-location");
			changeInput("where", "second-location");
			changeInput("where", "third-location");

			expect(deleteActions).toHaveBeenNthCalledWith(1, "tab");
			expect(deleteActions).toHaveBeenNthCalledWith(2, "first-location");
			expect(deleteActions).toHaveBeenNthCalledWith(3, "second-location");
			expect(deleteActions).toHaveBeenCalledTimes(3);

			expect(updateActions).toHaveBeenNthCalledWith(1, "first-location", []);
			expect(updateActions).toHaveBeenNthCalledWith(2, "second-location", []);
			expect(updateActions).toHaveBeenNthCalledWith(3, "third-location", []);
			expect(updateActions).toHaveBeenCalledTimes(3);
		});
	});

	describe('When [actions] input changes', () => {
		it('must call update actions with new "actions" and does not call delete actions if [where] does not changes', () => {
			const {changeInput} = setup();

			const updateActions = spyDependency(LocalActionsService, 'updateActions');
			const deleteActions = spyDependency(LocalActionsService, 'deleteActions');

			changeInput("actions", [{name: "first-action"}]);
			changeInput("actions", [{name: "second-action"}]);
			changeInput("actions", [{name: "third-action"}]);

			expect(deleteActions).not.toHaveBeenCalled();

			expect(updateActions).toHaveBeenNthCalledWith(1, "tab", [{name: "first-action"}]);
			expect(updateActions).toHaveBeenNthCalledWith(2, "tab", [{name: "second-action"}]);
			expect(updateActions).toHaveBeenNthCalledWith(3, "tab", [{name: "third-action"}]);
			expect(updateActions).toHaveBeenCalledTimes(3);
		});
	});

	describe('When component is destroyed', () => {
		it('must delete actions with current where', () => {
			setup();

			const deleteActions = spyDependency(LocalActionsService, 'deleteActions');

			destroyCurrentComponent();

			expect(deleteActions).toHaveBeenCalledExactlyOnceWith("tab");
		});
	});
});
