import { setupComponentTesting } from "../../../testing/setup/setup-component-testing";
import { NavigationContextComponent } from "./navigation-context.component";
import { hasCreatedComponent } from "../../../testing/utils/has-created-component";
import { NavigationContextService } from "./navigation-context.service";
import { signal } from "@angular/core";
import { NavigationContext } from "./models/navigation-context";
import { DeepPartial } from "../../../shared/models/deep-partial";
import { TestBed } from "@angular/core/testing";
import { getByTestId } from "../../../testing/getters/get-by-test-id";
import { findByTestId } from "../../../testing/getters/find-by-test-id";
import { detectChanges } from "../../../testing/utils/detect-changes";

interface SetupConfig {

}

const setup = (config?: SetupConfig) => {
	setupComponentTesting(NavigationContextComponent, {
		providers: [
			{
				provide: NavigationContextService,
				useFactory: () => {
					const lastContext = signal<NavigationContext | null>(null);

					return {
						lastContext,
						registerContext: (context: DeepPartial<NavigationContext>) => {
							lastContext.set(context as any);
						},
						clearAllContexts: () => {},
						finishContext: () => {},
					}
				}
			}
		]
	})
}


describe(NavigationContextComponent.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	describe('when no context provided', () => {
		it('must not render any context', () => {
			setup();

			expect(findByTestId('context')).toBeUndefined();
		});
	})

	describe('When context provided', () => {
		it('must must render navigation context with correct properties', () => {
			setup();

			const service = TestBed.inject(NavigationContextService);

			const expectedContext: NavigationContext = {
				icon: "some-icon",
				url: "http://some-url",
				message: "Some message"
			}

			service.registerContext(expectedContext);

			detectChanges();

			const contextElement = getByTestId('context');
			const icon = contextElement.getByTestId('icon').text();
			const message = contextElement.getByTestId('message').text();

			expect(icon).toBe(expectedContext.icon!);
			expect(message).toBe(expectedContext.message!);
		});

		it('must call finishContext with context provided when clicked', () => {
			setup();

			const service = TestBed.inject(NavigationContextService);
			const finishContext = jest.spyOn(service, 'finishContext');

			const expectedContext: NavigationContext = {
				icon: "some-icon",
				url: "http://some-url",
				message: "Some message"
			}

			service.registerContext(expectedContext);

			detectChanges();

			const contextElement = getByTestId('context');

			contextElement.triggerEventHandler('click');

			expect(finishContext).toHaveBeenCalledWith(expectedContext);
		});

		it('must call stopPropagation and call clearAllContexts when click on closeAction', () => {
			setup();

			const service = TestBed.inject(NavigationContextService);
			const clearAllContexts = jest.spyOn(service, 'clearAllContexts');

			const expectedContext: NavigationContext = {
				icon: "some-icon",
				url: "http://some-url",
				message: "Some message"
			}

			service.registerContext(expectedContext);

			detectChanges();

			const contextElement = getByTestId('context');
			const action = contextElement.getByTestId('action');

			const event = {
				stopPropagation: jest.fn(),
			}

			action.triggerEventHandler('click', event);

			expect(clearAllContexts).toHaveBeenCalledWith();
			expect(event.stopPropagation).toHaveBeenCalledWith();
		});
	});

});
