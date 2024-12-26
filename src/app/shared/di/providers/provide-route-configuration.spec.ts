import { Component } from "@angular/core";
import { provideAccessor } from "src/app/shared/di/providers/provide-accessor";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { TestBed } from "@angular/core/testing";
import { provideRouteConfiguration } from "src/app/shared/di/providers/provide-route-configuration";
import { DeepPartial } from "src/app/shared/models/deep-partial";
import { AppRoutes } from "src/app/shared/models/app-routes";
import { injectDep } from "src/app/testing/utils/inject-dep";
import { ALL_ROUTE_CONFIGURATION } from "src/app/shared/di/tokens/all-route-configuration";

interface SetupConfig {
	routes?: DeepPartial<AppRoutes>;
}

const setup = (config?: SetupConfig) => {
	TestBed.configureTestingModule({
		providers: [provideRouteConfiguration(config?.routes ?? [] as any)]
	})
}

describe(provideRouteConfiguration.name, () => {
	it('must provide ALL_ROUTE_CONFIGURATION with routes passed', () => {
		setup({
			routes: [
				{
					path: "orders",
					data: {}
				},
				{
					path: "products",
					data: {}
				}
			]
		});

		const configuration = injectDep(ALL_ROUTE_CONFIGURATION);

		expect(configuration).toEqual([
			{
				path: "orders",
				data: {}
			},
			{
				path: "products",
				data: {}
			}
		]);
	});
});
