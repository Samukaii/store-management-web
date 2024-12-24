import { setupComponentTesting } from "../../../testing/setup/setup-component-testing";
import { Component, effect, output, signal } from "@angular/core";
import { getCurrentComponentFixture } from "../../../testing/core/current-component-fixture";
import { hasCreatedComponent } from "../../../testing/utils/has-created-component";
import { ButtonLoadingFinishStatus } from "./models/button-loading-finish.status";
import { spyDependencyBeforeCreation } from "../../../testing/spies/spy-dependency-before-creation";
import { MockProvider } from "ng-mocks";
import { ButtonRequestLoadingService } from "./button-request-loading.service";
import { getByTestId } from "../../../testing/getters/get-by-test-id";
import { ButtonRequestLoadingDirective } from "./button-request-loading.directive";
import { beforeComponentCreate } from "../../../testing/core/before-component-create";
import { spyDependency } from "../../../testing/spies/spy-dependency";
import { UuidService } from "../../services/uuid/uuid.service";
import { detectChanges } from "../../../testing/utils/detect-changes";
import { fakeAsync, flush, TestBed, tick } from "@angular/core/testing";

const setup = () => {
	@Component({
		template: `
			@let id = identifier();

			@if (id) {
				<button
					data-test-id="button"
					(finishLoading)="finishLoading.emit($event)"
					[identifier]="id"
					appButtonRequestLoading
				>
				</button>
			} @else {
				<button
					data-test-id="button"
					(finishLoading)="finishLoading.emit($event)"
					appButtonRequestLoading
				>
				</button>
			}
		`,
		imports: [
			ButtonRequestLoadingDirective
		],
		selector: "app-root-test",
	})
	class HostComponent {
		finishLoading = output<ButtonLoadingFinishStatus>();
		identifier = signal('');
	}

	setupComponentTesting(HostComponent, {
		imports: [ButtonRequestLoadingDirective],
		providers: [
			MockProvider(ButtonRequestLoadingService),
			MockProvider(UuidService)
		]
	});

	return {component: getCurrentComponentFixture<HostComponent>().componentInstance}
}

describe(ButtonRequestLoadingDirective.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	it('must call registerButton with generated uuid and directive instance on start', () => {
		const registerButton = spyDependencyBeforeCreation(ButtonRequestLoadingService, 'registerButton');

		beforeComponentCreate(() => {
			spyDependency(UuidService, 'generate').mockReturnValue('generated-uuid');
		})

		setup();

		const button = getByTestId('button');

		const directive = button.read(ButtonRequestLoadingDirective)

		const spy = registerButton.resolve();

		const [identifier, directiveArg] = spy.mock.lastCall ?? [];

		expect(identifier).toBe('generated-uuid');
		expect(directiveArg).toBe(directive)
	});

	describe('When identifier is defined', () => {
		it('must unregister last identifier and register with new identifier', () => {
			beforeComponentCreate(() => {
				spyDependency(UuidService, 'generate').mockReturnValue('first-identifier');
			});

			const {component} = setup();

			const unregister = spyDependency(ButtonRequestLoadingService, 'unregisterButton');
			const register = spyDependency(ButtonRequestLoadingService, 'registerButton');

			component.identifier.set('second-identifier');
			detectChanges();

			const directive = getByTestId('button').read(ButtonRequestLoadingDirective)!;

			expect(unregister).toHaveBeenCalledWith('first-identifier');
			expect(unregister).toHaveBeenCalledTimes(1);

			expect(register).toHaveBeenCalledWith('second-identifier', directive);
			expect(register).toHaveBeenCalledTimes(2);

			component.identifier.set('third-identifier');
			detectChanges();

			expect(unregister).toHaveBeenCalledWith('second-identifier');
			expect(unregister).toHaveBeenCalledTimes(2);

			expect(register).toHaveBeenCalledWith('third-identifier', directive);
			expect(register).toHaveBeenCalledTimes(3);
		});
	});

	describe('On clicked', () => {
		it('must call setLastClickedButton with current identifier', () => {
			beforeComponentCreate(() => {
				spyDependency(UuidService, 'generate').mockReturnValue('generated-uuid');
			});

			setup();

			const setLastClickedButton = spyDependency(ButtonRequestLoadingService, 'setLastClickedButton');

			const button = getByTestId('button');

			button.triggerEventHandler('click');

			expect(setLastClickedButton).toHaveBeenCalledExactlyOnceWith('generated-uuid');
		});
	});

	describe('#startRequestLoading', () => {
		it('must update loading to true', () => {
			setup();

			const directive = getByTestId('button').read(ButtonRequestLoadingDirective)!;

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

					const directive = getByTestId('button').read(ButtonRequestLoadingDirective)!;

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

				const directive = getByTestId('button').read(ButtonRequestLoadingDirective)!;

				directive.startRequestLoading();

				directive.finalizeLoading('success');
				tick(100)

				expect(directive.loading()).toBe(false);
			}));
		});
	});
});
