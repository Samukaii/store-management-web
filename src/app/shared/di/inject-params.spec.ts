import { injectAllRoutes } from "src/app/shared/di/inject-all-routes";
import { TestBed } from "@angular/core/testing";
import { mockRouter } from "src/app/testing/mocks/mock-router";
import { ActivatedRouteSnapshot, UrlSegment } from "@angular/router";
import { DeepPartial } from "src/app/shared/models/deep-partial";
import { injectParams } from "src/app/shared/di/inject-params";
import { AppRouteConfiguration } from "src/app/shared/models/app-route-configuration";
import { Generic } from "src/app/shared/models/generic";

interface SetupConfig {
	route?: DeepPartial<ActivatedRouteSnapshot>;
}

const setup = (config?: SetupConfig) => {
	TestBed.configureTestingModule({
		providers: [mockRouter(config?.route)]
	})
};

describe(injectParams.name, () => {
	it('must collect all params in nested routes and join them as an object overriding top-level params with low-level params', () => {
		setup({
			route: {
				url: [new UrlSegment("products", {})],
				data: {},
				params: {
					id: 23,
					title: "Products"
				},
				children: [
					{
						url: [new UrlSegment("5", {})],
						data: {},
						params: {
							productId: 56,
							additionalInfo: "Some additional info",
							title: "Burger"
						},
						children: [
							{
								url: [new UrlSegment("ingredients", {})],
								data: {},
								params: {
									ingredientId: 67,
									title: "ingredients"
								},
								children: [
									{
										url: [new UrlSegment("7", {})],
										data: {},
										params: {
											ingredientId: 12,
											title: "Tomato"
										},
										children: []
									}
								]
							}
						]
					},
				]
			}
		});

		const expectedParams: Generic = {
			id: 23,
			productId: 56,
			title: "Tomato",
			ingredientId: 12,
			additionalInfo: "Some additional info",
		};

		TestBed.runInInjectionContext(() => {
			const params = injectParams();

			expect(params()).toEqual(expectedParams);
		});
	});
});
