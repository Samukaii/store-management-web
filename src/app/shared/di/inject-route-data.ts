import { computed } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { Generic } from "../models/generic";
import { injectAllRoutes } from "./inject-all-routes";

const getRouteData = (routes: ActivatedRouteSnapshot[]): Generic => {
	return routes.reduce((previousValue, currentValue) => {
		return {
			...previousValue,
			...currentValue.data
		}
	}, {});
};

export const injectRouteData = () => {
	const routes = injectAllRoutes();

	return computed(() => getRouteData(routes()))
}
