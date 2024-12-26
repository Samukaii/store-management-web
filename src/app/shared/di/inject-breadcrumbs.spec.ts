import { injectAllRoutes } from "src/app/shared/di/inject-all-routes";
import { TestBed } from "@angular/core/testing";
import { mockRouter } from "src/app/testing/mocks/mock-router";
import { ActivatedRouteSnapshot, UrlSegment } from "@angular/router";
import { DeepPartial } from "src/app/shared/models/deep-partial";
import { injectBreadcrumbs } from "src/app/shared/di/inject-breadcrumbs";
import { Breadcrumb } from "src/app/shared/models/breadcrumb";
import { AppRouteConfiguration } from "src/app/shared/models/app-route-configuration";

interface SetupConfig {
	route?: DeepPartial<ActivatedRouteSnapshot>;
}

const setup = (config?: SetupConfig) => {
	TestBed.configureTestingModule({
		providers: [mockRouter(config?.route)]
	})
};

describe(injectBreadcrumbs.name, () => {
	it('must get a nested route and turn it into a list of breadcrumbs', () => {
		setup({
			route: {
				url: [new UrlSegment("products", {})],
				data: {
					routeConfiguration: {
						breadcrumb: "Products"
					} as AppRouteConfiguration
				},
				children: [
					{
						url: [new UrlSegment("5", {})],
						data: {
							routeConfiguration: {
								breadcrumb: "Burger"
							} as AppRouteConfiguration
						},
						children: [
							{
								url: [new UrlSegment("ingredients", {})],
								data: {
									routeConfiguration: {
										breadcrumb: "Ingredients"
									} as AppRouteConfiguration
								},
								children: [
									{
										url: [new UrlSegment("7", {})],
										data: {
											routeConfiguration: {
												breadcrumb: "Tomato"
											} as AppRouteConfiguration
										},
										children: []
									}
								]
							},
							{
								url: [new UrlSegment("ingredients", {})],
								data: {
									routeConfiguration: {
										breadcrumb: "Ingredients"
									} as AppRouteConfiguration
								},
								children: []
							}
						]
					},
				]
			}
		});

		const expectedBreadcrumbs: Breadcrumb[] = [
			{
				name: "Products",
				route: "products",
			},
			{
				name: "Burger",
				route: "products/5",
			},
			{
				name: "Ingredients",
				route: "products/5/ingredients",
			},
			{
				name: "Tomato",
				route: "products/5/ingredients/7",
			},
		]

		TestBed.runInInjectionContext(() => {
			const breadcrumbs = injectBreadcrumbs();

			expect(breadcrumbs().length).toBe(expectedBreadcrumbs.length);

			expectedBreadcrumbs.forEach((expectedBreadcrumb, index) => {
				const breadcrumb = breadcrumbs()[index];

				expect(breadcrumb).toEqual(expectedBreadcrumb);
			})
		})
	});
});
