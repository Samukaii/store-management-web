import { computed, Injectable } from '@angular/core';
import { AppRouteConfiguration } from "src/app/shared/models/app-route-configuration";
import { injectRouteData } from "src/app/shared/di/inject-route-data";

@Injectable({
	providedIn: 'root'
})
export class RouteConfigurationService {
	private routeData = injectRouteData();

	private defaultConfiguration: AppRouteConfiguration = {
		breadcrumb: "",
	};

	routeConfiguration = computed(
		() => {
			const config: AppRouteConfiguration = this.routeData()['routeConfiguration'] || {};

			return {
				...this.defaultConfiguration,
				...config
			} as Required<AppRouteConfiguration>;
		}
	);
}
