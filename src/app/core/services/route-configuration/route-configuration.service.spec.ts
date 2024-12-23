import { TestBed } from "@angular/core/testing";
import { RouteConfigurationService } from "./route-configuration.service";
import { provideMockedRouter } from "../../../testing/mocks/provide-mocked-router";
import { ActivatedRouteSnapshot } from "@angular/router";
import { DeepPartial } from "../../../shared/models/deep-partial";
import { AppRouteConfiguration } from "../../../shared/models/app-route-configuration";

interface SetupConfig {
	routerSnapshot?: DeepPartial<ActivatedRouteSnapshot>;
}

const setup = (config?: SetupConfig) => {
	TestBed.configureTestingModule({
		providers: [
			provideMockedRouter(config?.routerSnapshot)
		]
	})

	const service = TestBed.inject(RouteConfigurationService);

	return {service};
}

describe(RouteConfigurationService.name, () => {
	it('must instantiate service', () => {
		const {service} = setup();

		expect(service).toBeTruthy();
	});

	it('routeConfiguration must match all accumulated routeConfiguration in routes', () => {
		const {service} = setup({
			routerSnapshot: {
				data: {
					routeConfiguration: {
						breadcrumb: "Root level breadcrumb",
						menu: {
							name: "Root level menu name",
							icon: "root-level-icon",
							parent: "Root level parent",
						},
					} as AppRouteConfiguration,
					children: [
						{
							data: {
								routeConfiguration: {
									breadcrumb: "First level breadcrumb",
									menu: {
										name: "First level menu name",
										icon: "first-level-icon",
										parent: "First parent level"
									},
								} as AppRouteConfiguration,
							},
							children: [
								{
									routeConfiguration: {
										breadcrumb: "Second level breadcrumb",
										menu: {
											name: "Second level menu name",
											icon: "second-level-icon",
											parent: "Second parent level"
										},
									} as AppRouteConfiguration,
								}
							]
						}
					]
				}
			}
		});

		const result = service.routeConfiguration();

		expect(result).toEqual({
			breadcrumb: "Root level breadcrumb",
			menu: {
				name: "Root level menu name",
				icon: "root-level-icon",
				parent: "Root level parent"
			},
		});
	});
});
