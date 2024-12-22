import { ALL_ROUTE_CONFIGURATION } from "../tokens/all-route-configuration";
import { AppRoutes } from "../../models/app-routes";

export const provideRouteConfiguration = (routes: AppRoutes) => {
	return [
		{provide: ALL_ROUTE_CONFIGURATION, useValue: routes},
	]
};
