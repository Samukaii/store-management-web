import { computed, Injectable } from '@angular/core';
import { injectRouteData } from "../../shared/di/inject-route-data";
import { AppRouteConfiguration } from "../../shared/models/app-route-configuration";

@Injectable({
	providedIn: 'root'
})
export class RouteConfigurationService {
	private routeData = injectRouteData();

	private defaultConfiguration: Required<AppRouteConfiguration> = {
		showToolbar: true,
		showMenu: true,
		showFriends: true,
		breadcrumb: ""
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
