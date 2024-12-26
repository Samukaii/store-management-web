import { injectAllRoutes } from "src/app/shared/di/inject-all-routes";
import { TestBed } from "@angular/core/testing";
import { mockRouter } from "src/app/testing/mocks/mock-router";
import { ActivatedRouteSnapshot, UrlSegment } from "@angular/router";
import { DeepPartial } from "src/app/shared/models/deep-partial";

interface SetupConfig {
	route?: DeepPartial<ActivatedRouteSnapshot>;
}

const setup = (config?: SetupConfig) => {
	TestBed.configureTestingModule({
		providers: [mockRouter(config?.route)]
	})
};

describe(injectAllRoutes.name, () => {
	it('must match nested routes as a list', () => {
		setup({
			route: {
				url: [new UrlSegment("products", {})],
				data: {
					title: "Products"
				},
				children: [
					{
						url: [new UrlSegment(":id", {})],
						data: {
							title: "Burger"
						},
						children: [
							{
								url: [new UrlSegment("ingredients", {})],
								data: {
									title: "Ingredients"
								},
								children: []
							}
						]
					}
				]
			}
		});

		const expectedRoutes: DeepPartial<ActivatedRouteSnapshot>[] = [
			{
				url: [new UrlSegment("products", {})],
				data: {title: "Products"},
			},
			{
				url: [new UrlSegment(":id", {})],
				data: {title: "Burger"},
			},
			{
				url: [new UrlSegment("ingredients", {})],
				data: {title: "Ingredients"},
			},
		]

		TestBed.runInInjectionContext(() => {
			const routes = injectAllRoutes();

			expect(routes().length).toBe(3);

			expectedRoutes.forEach((expectedRoute, index) => {
				const route = routes()[index];

				expect(route.url.toString()).toBe(expectedRoute.url?.toString());
				expect(route.data).toEqual(expectedRoute.data);
			})
		})
	});
});
