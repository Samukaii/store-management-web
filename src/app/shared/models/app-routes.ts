import { Route } from "@angular/router";
import { AppRouteConfiguration } from "./app-route-configuration";

interface AppRoute extends Route {
	data?: {
		routeConfiguration?: AppRouteConfiguration
	} & Record<string, any>;
}

export type AppRoutes = AppRoute[];
