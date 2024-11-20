import { ActivatedRouteSnapshot } from "@angular/router";
import { Generic } from "../models/generic";
import { injectAllRoutes } from "./inject-all-routes";
import { computed } from "@angular/core";

const getParams = (routes: ActivatedRouteSnapshot[]): Generic => {
	return routes.reduce((params, currentRoute) => {
		return {
			...params,
			...currentRoute.params
		}
	}, {});
};

export const injectParams = () => {
	const routes = injectAllRoutes();

	return computed(() => getParams(routes()))
}
