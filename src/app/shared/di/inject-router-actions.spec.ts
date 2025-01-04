import { TestBed } from "@angular/core/testing";
import { mockRouter } from "src/app/testing/mocks/mock-router";
import { injectRouterActions } from "src/app/shared/di/inject-router-actions";
import { injectDep } from "src/app/testing/utils/inject-dep";
import { ActivatedRoute, Router } from "@angular/router";
import { spyDependency } from "src/app/testing/spies/spy-dependency";

const setup = () => {
	TestBed.configureTestingModule({
		providers: [mockRouter()]
	})
};

describe(injectRouterActions.name, () => {
	describe('goBack', () => {
		it('must call router navigate with "../" and activated route', () => {
			setup();

			TestBed.runInInjectionContext(() => {
				const actions = injectRouterActions();
				const route = injectDep(ActivatedRoute);
				const navigate = spyDependency(Router, 'navigate');

				actions.goBack();

				expect(navigate).toHaveBeenCalledExactlyOnceWith(['../'], {
					relativeTo: route,
				});
			});
		});
	});

	describe('goToSingle', () => {
		it('must call router navigate with passed id and activated route', () => {
			setup();

			TestBed.runInInjectionContext(() => {
				const actions = injectRouterActions();
				const route = injectDep(ActivatedRoute);
				const navigate = spyDependency(Router, 'navigate');

				actions.goToSingle(412);

				expect(navigate).toHaveBeenCalledExactlyOnceWith([412], {
					relativeTo: route,
				});
			});
		});
	});

	describe('goToSingleTab', () => {
		it('must call router navigate with passed id, activated route and tab passed', () => {
			setup();

			TestBed.runInInjectionContext(() => {
				const actions = injectRouterActions();
				const route = injectDep(ActivatedRoute);
				const navigate = spyDependency(Router, 'navigate');

				actions.goToSingleTab(412, 34);

				expect(navigate).toHaveBeenCalledExactlyOnceWith([412], {
					relativeTo: route,
					queryParams: {
						tab: 34
					}
				});
			});
		});
	});

});
