import { TestBed } from "@angular/core/testing";
import { mockRouter } from "src/app/testing/mocks/mock-router";
import { ActivatedRouteSnapshot, UrlSegment } from "@angular/router";
import { DeepPartial } from "src/app/shared/models/deep-partial";
import { Generic } from "src/app/shared/models/generic";
import { injectRouteData } from "src/app/shared/di/inject-route-data";

interface SetupConfig {
	route?: DeepPartial<ActivatedRouteSnapshot>;
}

const setup = (config?: SetupConfig) => {
	TestBed.configureTestingModule({
		providers: [mockRouter(config?.route)]
	})
};

describe(injectRouteData.name, () => {
	it('must collect all query params in nested routes and join them as an object overriding top-level query params ' +
		'with low-level query params', () => {
		setup({
			route: {
				url: [new UrlSegment("products", {})],
				data: {
					id: 23,
					title: "Products"
				},
				children: [
					{
						url: [new UrlSegment("5", {})],
						data: {
							productId: 56,
							additionalInfo: "Some additional info",
							title: "Burger"
						},
						children: [
							{
								url: [new UrlSegment("ingredients", {})],
								data: {
									ingredientId: 67,
									title: "ingredients"
								},
								children: [
									{
										url: [new UrlSegment("7", {})],
										data: {
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
			const data = injectRouteData();

			expect(data()).toEqual(expectedParams);
		});
	});
});
