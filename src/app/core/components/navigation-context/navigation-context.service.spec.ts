import { TestBed } from "@angular/core/testing";
import { NavigationContextService } from "./navigation-context.service";
import { mockRouter } from "src/app/testing/mocks/mock-router";
import { injectDep } from "src/app/testing/utils/inject-dep";
import { NavigationContext } from "./models/navigation-context";
import { spyDependency } from "src/app/testing/spies/spy-dependency";
import { Router } from "@angular/router";

const setup = () => {
	TestBed.configureTestingModule({
		providers: [
			mockRouter()
		]
	})

	const service = injectDep(NavigationContextService);

	return {service};
}

describe(NavigationContextService.name, () => {
	it('must instantiate service', () => {
		const {service} = setup();

		expect(service).toBeTruthy();
	});

	describe('#registerContext', () => {
		it('must add new context to contexts property in reversed order', () => {
			const {service} = setup();

			const firstContext: NavigationContext = {
				icon: "first-icon",
				url: "http://first-url",
				message: "First message"
			};

			const secondContext: NavigationContext = {
				icon: "second-icon",
				url: "http://second-url",
				message: "Second message"
			};

			service.registerContext(firstContext);
			service.registerContext(secondContext);

			expect(service.contexts()).toEqual(
				[secondContext, firstContext]
			)
		});

		it('must update last context with the last context added', () => {
			const {service} = setup();

			const firstContext: NavigationContext = {
				icon: "first-icon",
				url: "http://first-url",
				message: "First message"
			};

			const secondContext: NavigationContext = {
				icon: "second-icon",
				url: "http://second-url",
				message: "Second message"
			};

			service.registerContext(firstContext);
			service.registerContext(secondContext);

			expect(service.lastContext()).toEqual(secondContext)
		});
	});

	describe('#finishContext', () => {
		it('must navigate to url given by context', () => {
			const {service} = setup();

			const firstContext: NavigationContext = {
				icon: "first-icon",
				url: "http://first-url",
				message: "First message"
			};

			const secondContext: NavigationContext = {
				icon: "second-icon",
				url: "http://second-url",
				message: "Second message"
			};

			service.registerContext(firstContext);
			service.registerContext(secondContext);

			const navigateByUrl = spyDependency(Router, 'navigateByUrl');

			service.finishContext(firstContext);

			expect(navigateByUrl).toHaveBeenCalledWith(firstContext.url);
		});

		it('must remove context from contexts list', () => {
			const {service} = setup();

			const firstContext: NavigationContext = {
				icon: "first-icon",
				url: "http://first-url",
				message: "First message"
			};

			const secondContext: NavigationContext = {
				icon: "second-icon",
				url: "http://second-url",
				message: "Second message"
			};

			service.registerContext(firstContext);
			service.registerContext(secondContext);

			service.finishContext(firstContext);

			expect(service.contexts()).toEqual([secondContext]);
		});

		it('must update last context to last remaining', () => {
			const {service} = setup();

			const firstContext: NavigationContext = {
				icon: "first-icon",
				url: "http://first-url",
				message: "First message"
			};

			const secondContext: NavigationContext = {
				icon: "second-icon",
				url: "http://second-url",
				message: "Second message"
			};

			service.registerContext(firstContext);
			service.registerContext(secondContext);

			service.finishContext(secondContext);

			expect(service.lastContext()).toEqual(firstContext);
		});
	});

	describe('#clearAllContexts', () => {
		it('must remove all contexts', () => {
			const {service} = setup();

			const firstContext: NavigationContext = {
				icon: "first-icon",
				url: "http://first-url",
				message: "First message"
			};

			const secondContext: NavigationContext = {
				icon: "second-icon",
				url: "http://second-url",
				message: "Second message"
			};

			service.registerContext(firstContext);
			service.registerContext(secondContext);

			service.clearAllContexts();

			expect(service.contexts()).toEqual([]);
		});

		it('must update last context to null', () => {
			const {service} = setup();

			const firstContext: NavigationContext = {
				icon: "first-icon",
				url: "http://first-url",
				message: "First message"
			};

			const secondContext: NavigationContext = {
				icon: "second-icon",
				url: "http://second-url",
				message: "Second message"
			};

			service.registerContext(firstContext);
			service.registerContext(secondContext);

			service.clearAllContexts();

			expect(service.lastContext()).toBe(null);
		});
	});
});
