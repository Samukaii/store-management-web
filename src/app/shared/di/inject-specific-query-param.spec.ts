import { TestBed } from "@angular/core/testing";
import { mockRouter } from "src/app/testing/mocks/mock-router";
import { ActivatedRouteSnapshot, UrlSegment } from "@angular/router";
import { DeepPartial } from "src/app/shared/models/deep-partial";
import { Generic } from "src/app/shared/models/generic";
import { injectSpecificQueryParam } from "src/app/shared/di/inject-specific-query-param";

interface SetupConfig {
	route?: DeepPartial<ActivatedRouteSnapshot>;
}

const setup = (config?: SetupConfig) => {
	TestBed.configureTestingModule({
		providers: [mockRouter(config?.route)]
	})
};

describe(injectSpecificQueryParam.name, () => {
	it('must get query params and return specific param requested', () => {
		setup({
			route: {
				url: [new UrlSegment("products", {})],
				data: {},
				queryParams: {
					id: 23,
					title: "Products"
				},
				children: [
					{
						url: [new UrlSegment("5", {})],
						data: {},
						queryParams: {
							productId: 56,
							additionalInfo: "Some additional info",
							title: "Burger"
						},
						children: [
							{
								url: [new UrlSegment("ingredients", {})],
								data: {},
								queryParams: {
									ingredientId: 67,
									title: "ingredients"
								},
								children: [
									{
										url: [new UrlSegment("7", {})],
										data: {},
										queryParams: {
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

		const expectedParams = {
			id: 23,
			productId: 56,
			title: "Tomato",
			ingredientId: 12,
			additionalInfo: "Some additional info",
		};

		TestBed.runInInjectionContext(() => {
			const id = injectSpecificQueryParam('id');
			const productId = injectSpecificQueryParam('productId');
			const title = injectSpecificQueryParam('title');
			const ingredientId = injectSpecificQueryParam('ingredientId');
			const additionalInfo = injectSpecificQueryParam('additionalInfo');

			expect(id()).toEqual(expectedParams.id);
			expect(productId()).toEqual(expectedParams.productId);
			expect(title()).toEqual(expectedParams.title);
			expect(ingredientId()).toEqual(expectedParams.ingredientId);
			expect(additionalInfo()).toEqual(expectedParams.additionalInfo);
		});
	});
});
