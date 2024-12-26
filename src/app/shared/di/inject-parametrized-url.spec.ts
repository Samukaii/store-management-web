import { TestBed } from "@angular/core/testing";
import { mockRouter } from "src/app/testing/mocks/mock-router";
import { ActivatedRouteSnapshot, UrlSegment } from "@angular/router";
import { DeepPartial } from "src/app/shared/models/deep-partial";
import { injectParametrizedUrl } from "src/app/shared/di/inject-parametrized-url";

interface SetupConfig {
	route?: DeepPartial<ActivatedRouteSnapshot>;
}

const setup = (config?: SetupConfig) => {
	TestBed.configureTestingModule({
		providers: [mockRouter(config?.route)]
	})
};

describe(injectParametrizedUrl.name, () => {
	it('must fill string parts which starts with ":" with url params', () => {
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

		const expectedUrl = "route/23/56/Tomato/12/Some additional info";

		TestBed.runInInjectionContext(() => {
			const url = "route/:id/:productId/:title/:ingredientId/:additionalInfo";

			const parametrizedUrl = injectParametrizedUrl(url);

			expect(parametrizedUrl()).toBe(expectedUrl);
		});
	});
});
