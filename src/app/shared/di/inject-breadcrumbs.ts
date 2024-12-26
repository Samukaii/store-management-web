import { computed } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { AppRouteConfiguration } from "../models/app-route-configuration";
import { Breadcrumb } from "../models/breadcrumb";
import { injectAllRoutes } from "./inject-all-routes";

const joinBreadcrumbUrls = (breadcrumbs: Breadcrumb[], name: string) => {
	const lastBreadcrumb = breadcrumbs.at(-1)?.route;

	if(!lastBreadcrumb) return name;

	return `${lastBreadcrumb}/${name}`;
}

const getBreadcrumbs = (routes: ActivatedRouteSnapshot[]): Breadcrumb[] => {
	return routes.reduce((breadcrumbs, currentRoute) => {
		const data = currentRoute.data["routeConfiguration"] as AppRouteConfiguration;
		const breadcrumbName = data?.breadcrumb;

		if(!breadcrumbName) return breadcrumbs;

		if(breadcrumbs.find(value => value.name === breadcrumbName))
			return breadcrumbs;

		return [
			...breadcrumbs,
			{
				name: breadcrumbName,
				route: joinBreadcrumbUrls(breadcrumbs, currentRoute.url.toString())
			}
		]
	}, [] as Breadcrumb[]);
}

export const injectBreadcrumbs = () => {
	const routes = injectAllRoutes();

	return computed(() => getBreadcrumbs(routes()))
}
