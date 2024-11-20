import { injectAllRoutes } from "./inject-all-routes";
import { computed } from "@angular/core";

export const injectQueryParams = () => {
	const routes = injectAllRoutes();

	return computed(() => routes().reduce((queryParams, currentRoute) =>
			({
				...queryParams,
				...currentRoute.queryParams
			})
		, {} as Record<string, string>)
	)
}
