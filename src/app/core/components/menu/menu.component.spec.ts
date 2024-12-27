import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";
import { MenuComponent } from "./menu.component";
import { hasCreatedComponent } from "src/app/testing/utils/has-created-component";
import { provideRouteConfiguration } from "src/app/shared/di/providers/provide-route-configuration";
import { AppRoutes } from "src/app/shared/models/app-routes";
import { DeepPartial } from "src/app/shared/models/deep-partial";
import { getAllByTestId } from "src/app/testing/getters/get-all-by-test-id";
import { MenuItem } from "src/app/shared/di/inject-menu-items";

interface SetupConfig {
	routes?: DeepPartial<AppRoutes>;
}

const setup = (config?: SetupConfig) => {
	setupComponentTesting(MenuComponent, {
		providers: [
			provideRouteConfiguration(config?.routes ?? [] as any)
		]
	})
}


describe(MenuComponent.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	it('must render menu for all routes with menu configured', () => {
		setup({
			routes: [
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
				}
			]
		});


		const menuElements = getAllByTestId("menu");

		const expectedMenus: MenuItem[] = [
			{
				name: "Sells",
				items: [
					{
						name: "Orders",
						icon: "menu_book",
						route: "orders"
					}
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

		expectedMenus.forEach((expectedMenu, index) => {
			const element = menuElements[index];

			expect(element.getByTestId("title").text()).toBe(expectedMenu.name);

			const itemsElements = element.getAllByTestId('item');

			expectedMenu.items.forEach((item, index) => {
				const itemElement = itemsElements[index];

				expect(itemElement.properties["routerLink"]).toBe(item.route);
				expect(itemElement.getByTestId('icon').text()).toBe(item.icon);
				expect(itemElement.getByTestId('name').text()).toBe(item.name);
			})
		});
	});

	it('must join menus with same parent', () => {
		setup({
			routes: [
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
								parent: "Sells",
								name: "Products",
								icon: "restaurant"
							}
						}
					}
				}
			]
		});


		const menuElements = getAllByTestId("menu");

		const expectedMenus: MenuItem[] = [
			{
				name: "Sells",
				items: [
					{
						name: "Orders",
						icon: "menu_book",
						route: "orders"
					},
					{
						icon: "restaurant",
						name: "Products",
						route: "products"
					}
				]
			},
		];

		expectedMenus.forEach((expectedMenu, index) => {
			const element = menuElements[index];

			expect(element.getByTestId("title").text()).toBe(expectedMenu.name);

			const itemsElements = element.getAllByTestId('item');

			expectedMenu.items.forEach((item, index) => {
				const itemElement = itemsElements[index];

				expect(itemElement.properties["routerLink"]).toBe(item.route);
				expect(itemElement.getByTestId('icon').text()).toBe(item.icon);
				expect(itemElement.getByTestId('name').text()).toBe(item.name);
			})
		});
	});

	it('must put menus without parent into an empty group', () => {
		setup({
			routes: [
				{
					path: "orders",
					data: {
						routeConfiguration: {
							menu: {
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
								parent: "Sells",
								name: "Products",
								icon: "restaurant"
							}
						}
					}
				}
			]
		});


		const menuElements = getAllByTestId("menu");

		const expectedMenus: MenuItem[] = [
			{
				name: "",
				items: [
					{
						name: "Orders",
						icon: "menu_book",
						route: "orders"
					},
				]
			},
			{
				name: "Sells",
				items: [
					{
						icon: "restaurant",
						name: "Products",
						route: "products"
					}
				]
			},
		];

		expectedMenus.forEach((expectedMenu, index) => {
			const element = menuElements[index];

			expect(element.getByTestId("title").text()).toBe(expectedMenu.name);

			const itemsElements = element.getAllByTestId('item');

			expectedMenu.items.forEach((item, index) => {
				const itemElement = itemsElements[index];

				expect(itemElement.properties["routerLink"]).toBe(item.route);
				expect(itemElement.getByTestId('icon').text()).toBe(item.icon);
				expect(itemElement.getByTestId('name').text()).toBe(item.name);
			})
		});
	});
});
