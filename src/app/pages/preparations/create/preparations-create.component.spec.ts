import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";
import { PreparationsCreateComponent } from "./preparations-create.component";
import { hasCreatedComponent } from "src/app/testing/utils/has-created-component";
import { MockProvider } from "ng-mocks";
import { PreparationsService } from "../preparations.service";
import { mockRouter } from "src/app/testing/mocks/mock-router";
import { getByTestId } from "src/app/testing/getters/get-by-test-id";
import { PreparationsFormValue } from "../models/preparations-form-value";
import { spyDependency } from "src/app/testing/spies/spy-dependency";
import { ActivatedRoute, Router } from "@angular/router";
import { injectDep } from "src/app/testing/utils/inject-dep";

interface SetupConfig {

}

const setup = (config?: SetupConfig) => {
	setupComponentTesting(PreparationsCreateComponent, {
		providers: [
			MockProvider(PreparationsService),
			mockRouter()
		]
	})
}


describe(PreparationsCreateComponent.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	describe('On submit', () => {
		it('must call service create with given value', () => {
			setup();

			const form = getByTestId('form');
			const create = spyDependency(PreparationsService, 'create').asObservableOf({});

			const value = {
				name: "Some preparation",
				quantity: 2.4
			} as PreparationsFormValue;

			form.triggerEventHandler('formSubmit', value);

			expect(create).toHaveBeenCalledWith(value);
		});

		it('must navigate to single with tab 1 as queryParams relating to activated route', () => {
			setup();

			const form = getByTestId('form');
			const navigate = spyDependency(Router, 'navigate');
			spyDependency(PreparationsService, 'create').asObservableOf({id: 23})


			form.triggerEventHandler('formSubmit', {});

			expect(navigate).toHaveBeenCalledWith(['..', 23], {
				queryParams: {
					tab: 1
				},
				relativeTo: injectDep(ActivatedRoute)
			})
		});
	});
});
