import { setupComponentTesting } from "../../../testing/setup/setup-component-testing";
import { BreadcrumbComponent } from "./breadcrumb.component";
import { hasCreatedComponent } from "../../../testing/utils/has-created-component";
import { provideMockedRouter } from "../../../testing/mocks/provide-mocked-router";
import { ActivatedRouteSnapshot, UrlSegment } from "@angular/router";
import { DeepPartial } from "../../../shared/models/deep-partial";
import { Breadcrumb } from "../../../shared/models/breadcrumb";
import { getAllByTestId } from "../../../testing/getters/get-all-by-test-id";

interface SetupConfig {
	route?: DeepPartial<ActivatedRouteSnapshot>;
}

const setup = (config?: SetupConfig) => {
	setupComponentTesting(BreadcrumbComponent, {
		providers: [
			provideMockedRouter(config?.route)
		]
	})
}


describe(BreadcrumbComponent.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	it('must render all breadcrumb names for routes with breadcrumb', () => {
		setup({
			route: {
				url: [new UrlSegment('products', {})],
				data: {
					routeConfiguration: {
						breadcrumb: "Products"
					}
				},
				children: [
					{
						url: [new UrlSegment(':id', {})],
						data: {
							routeConfiguration: {
								breadcrumb: "Edit"
							}
						},
						children: [
							{
								url: [new UrlSegment('other', {})],
								data: {},
								children: []
							}
						]
					}
				]
			}
		});

		const expectedBreadcrumbs: Breadcrumb[] = [
			{
				name: "Products",
				route: "products"
			},
			{
				name: "Edit",
				route: "products/:id",
			}
		];

		const breadcrumbElements = getAllByTestId('breadcrumb');

		expect(breadcrumbElements.length).toBe(expectedBreadcrumbs.length);

		expectedBreadcrumbs.forEach((breadcrumb, index) => {
			const element = breadcrumbElements[index];

			const name = element.getByTestId('name').text();

			expect(name).toBe(breadcrumb.name);
		})
	});

	it('all breadcrumbs except the last must has a separator with text "/" and a routerLink with correct route', () => {
		setup({
			route: {
				url: [new UrlSegment('products', {})],
				data: {
					routeConfiguration: {
						breadcrumb: "Products"
					}
				},
				children: [
					{
						url: [new UrlSegment(':id', {})],
						data: {
							routeConfiguration: {
								breadcrumb: "Edit"
							}
						},
						children: [
							{
								url: [new UrlSegment('other', {})],
								data: {},
								children: []
							}
						]
					}
				]
			}
		});

		const expectedBreadcrumbs: Breadcrumb[] = [
			{
				name: "Products",
				route: "products"
			},
			{
				name: "Edit",
				route: "products/:id",
			}
		];

		const breadcrumbElements = getAllByTestId('breadcrumb');

		expect(breadcrumbElements.length).toBe(expectedBreadcrumbs.length);

		expectedBreadcrumbs.forEach((breadcrumb, index) => {
			const isLast = index===expectedBreadcrumbs.length - 1;

			const element = breadcrumbElements[index];

			const separator = element.findByTestId('separator');
			const routerLink = element.findByTestId('name')?.properties['routerLink'];

			if (isLast) {
				expect(separator).toBeUndefined();
				expect(routerLink).toBeUndefined();
			} else {
				expect(separator?.text()).toBe("/");
				expect(routerLink).toBe(breadcrumb.route);
			}
		})
	});
});
