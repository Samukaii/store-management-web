import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";
import { Component } from "@angular/core";
import { getCurrentComponentFixture } from "src/app/testing/core/current-component-fixture";
import { hasCreatedComponent } from "src/app/testing/utils/has-created-component";
import { ButtonLoadingFinishStatus } from "./models/button-loading-finish.status";
import { spyDependencyBeforeCreation } from "src/app/testing/spies/spy-dependency-before-creation";
import { MockProvider } from "ng-mocks";
import { ButtonRequestLoadingService } from "./button-request-loading.service";
import { ButtonRequestLoadingDirective } from "./button-request-loading.directive";
import { beforeComponentCreate } from "src/app/testing/core/before-component-create";
import { spyDependency } from "src/app/testing/spies/spy-dependency";
import { UuidService } from "../../services/uuid/uuid.service";
import { fakeAsync, flush, tick } from "@angular/core/testing";
import { getFixtureDependency } from "src/app/testing/core/get-fixture-dependency";
import { changeInput } from "src/app/testing/core/change-input";
import { ComponentInputs } from "src/app/shared/models/component-inputs";


interface SetupConfig {
	inputs?: Partial<ComponentInputs<ButtonRequestLoadingDirective>>;
}

const setup = (config?: SetupConfig) => {
	@Component({
		template: ``,
		selector: "app-root-test",
		hostDirectives: [
			{
				directive: ButtonRequestLoadingDirective,
				inputs: ['identifier'],
				outputs: ['finishLoading'],
			}
		]
	})
	class HostComponent {
	}

	setupComponentTesting(HostComponent, {
		imports: [ButtonRequestLoadingDirective],
		inputs: config?.inputs,
		providers: [
			MockProvider(ButtonRequestLoadingService),
			MockProvider(UuidService)
		]
	});
}

describe(ButtonRequestLoadingDirective.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	describe('When identification changes', () => {
		it('must unregister last identifier and register with new identifier', () => {
			beforeComponentCreate(() => {
				spyDependency(UuidService, 'generate').mockReturnValue('generated-uuid');
			});

			setup();

			const unregister = spyDependency(ButtonRequestLoadingService, 'unregisterButton');
			const register = spyDependency(ButtonRequestLoadingService, 'registerButton');
			const directive = getFixtureDependency(ButtonRequestLoadingDirective);

			changeInput('identifier', 'second-identifier');
			changeInput('identifier', 'third-identifier');

			expect(unregister).toHaveBeenNthCalledWith(1, 'generated-uuid');
			expect(unregister).toHaveBeenNthCalledWith(2, 'second-identifier');
			expect(unregister).toHaveBeenCalledTimes(2);

			expect(register).toHaveBeenNthCalledWith(1, 'second-identifier', directive);
			expect(register).toHaveBeenNthCalledWith(2, 'third-identifier', directive);
			expect(register).toHaveBeenCalledTimes(2);
		});
	});

	describe('When identifier is not initially provided', () => {
		it('must call registerButton with generated uuid and directive instance on start', () => {
			const registerButton = spyDependencyBeforeCreation(ButtonRequestLoadingService, 'registerButton');

			beforeComponentCreate(() => {
				spyDependency(UuidService, 'generate').mockReturnValue('generated-uuid');
			});

			setup();

			const directive = getFixtureDependency(ButtonRequestLoadingDirective);

			expect(registerButton.resolve()).toHaveBeenCalledExactlyOnceWith('generated-uuid', directive);
		});
	});

	describe('When identifier is initially provided', () => {
		it('must call registerButton with provided input on start', () => {
			const registerButton = spyDependencyBeforeCreation(ButtonRequestLoadingService, 'registerButton');

			beforeComponentCreate(() => {
				spyDependency(UuidService, 'generate').mockReturnValue('generated-uuid');
			})

			setup({
				inputs: {
					identifier: 'provided-identifier',
				}
			});

			const directive = getFixtureDependency(ButtonRequestLoadingDirective);

			expect(registerButton.resolve()).toHaveBeenCalledExactlyOnceWith('provided-identifier', directive);
		});
	});

	describe('On clicked', () => {
		it('must call setLastClickedButton with current identifier', () => {
			beforeComponentCreate(() => {
				spyDependency(UuidService, 'generate').mockReturnValue('generated-uuid');
			});

			setup();

			const setLastClickedButton = spyDependency(ButtonRequestLoadingService, 'setLastClickedButton');

			const fixture = getCurrentComponentFixture();

			fixture.debugElement.triggerEventHandler('click');

			expect(setLastClickedButton).toHaveBeenCalledExactlyOnceWith('generated-uuid');
		});
	});

	describe('#startRequestLoading', () => {
		it('must update loading to true', () => {
			setup();

			const directive = getFixtureDependency(ButtonRequestLoadingDirective);

			directive.startRequestLoading();

			expect(directive.loading()).toBe(true);
		});
	});

	describe('#finalizeLoading', () => {
		const testCases: {status: ButtonLoadingFinishStatus}[] = [
			{status: 'success'},
			{status: 'error'},
			{status: 'no-request'},
		];

		testCases.forEach(({status}) => {
			describe(`When called with status "${status}"`, () => {
				it(`must emit finishLoading with status "${status}" when called with ${status}`, fakeAsync(() => {
					setup();

					const directive = getFixtureDependency(ButtonRequestLoadingDirective);

					let finishStatus: ButtonLoadingFinishStatus | undefined = undefined;

					directive.finishLoading.subscribe(result => finishStatus = result);

					directive.finalizeLoading(status);

					flush();

					expect(finishStatus).toBe(status);
				}));
			});
		});

		describe('After startRequestLoading already called', () => {
			it('must set loading to false after 100 ms', fakeAsync(() => {
				setup();

				const directive = getFixtureDependency(ButtonRequestLoadingDirective);

				directive.startRequestLoading();

				directive.finalizeLoading('success');
				tick(100)

				expect(directive.loading()).toBe(false);
			}));
		});
	});
});
