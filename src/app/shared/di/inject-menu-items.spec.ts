import { injectMenuItems, MenuItem } from "src/app/shared/di/inject-menu-items";
import { TestBed } from "@angular/core/testing";
import { ALL_ROUTE_CONFIGURATION } from "src/app/shared/di/tokens/all-route-configuration";
import { DeepPartial } from "src/app/shared/models/deep-partial";
import { AppRoutes } from "src/app/shared/models/app-routes";
import { provideRouteConfiguration } from "src/app/shared/di/providers/provide-route-configuration";

interface SetupConfig {
	routes?: DeepPartial<AppRoutes>;
}

export const setup = (config?: SetupConfig) => {
	TestBed.configureTestingModule({
		providers: [
			provideRouteConfiguration(config?.routes ?? [] as any)
		]
	});
}

describe(injectMenuItems.name, () => {
	it('must return a list of menus based on route configuration', () => {
		setup({
			routes: [
				{
					path: "standalone-menu",
					data: {
						routeConfiguration: {
							menu: {
								name: "Standalone menu",
								icon: "monitoring"
							}
						}
					}
				},
				{
					path: "orders",
					data: {
						routeConfiguration: {
							menu: {
								parent: "Sells",
								name: "Orders",
								icon: "menu_book"
							}
						}
					}
				},
				{
					path: "route-without-menu",
					data: {
						routeConfiguration: {
							breadcrumb: "Menu without breadcrumb",
						}
					}
				},
				{
					path: "products",
					data: {
						routeConfiguration: {
							menu: {
								parent: "Products",
								name: "Products",
								icon: "restaurant"
							}
						}
					}
				},
				{
					path: "analytics",
					data: {
						routeConfiguration: {
							menu: {
								parent: "Sells",
								name: "Analytics",
								icon: "monitoring"
							}
						}
					}
				},
			]
		});

		const expectedMenus: MenuItem[] = [
			{
				name: "",
				items: [
					{
						name: "Standalone menu",
						icon: "monitoring",
						route: "standalone-menu"
					},
				]
			},
			{
				name: "Sells",
				items: [
					{
						name: "Orders",
						icon: "menu_book",
						route: "orders"
					},
					{
						name: "Analytics",
						icon: "monitoring",
						route: "analytics"
					},
				]
			},
			{
				name: "Products",
				items: [
					{
						icon: "restaurant",
						name: "Products",
						route: "products"
					}
				]
			}
		];


		TestBed.runInInjectionContext(() => {
			const menus = injectMenuItems();

			expect(menus).toEqual(expectedMenus);
		});
	});
});
