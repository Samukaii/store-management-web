import { ActivatedRouteSnapshot, NavigationEnd, Router } from "@angular/router";
import { inject } from "@angular/core";
import { filter, map, Observable, tap } from "rxjs";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";

const collectRoutes = (router: Router) => {
	let routes: ActivatedRouteSnapshot[] = [];
	let stack: ActivatedRouteSnapshot[] = [router.routerState.snapshot.root];

	while (stack.length > 0) {
		const route = stack.pop()!;

		routes = [
			...routes,
			route
		]

		stack.push(...route.children);
	}

	return routes;
}

export const injectAllRoutes = () => {
	const router = inject(Router);

	const watchRouter$: Observable<ActivatedRouteSnapshot[]> =  router.events.pipe(
		filter(type => type instanceof NavigationEnd),
		map(() => collectRoutes(router)),
		takeUntilDestroyed()
	);

	return toSignal(watchRouter$, {
		initialValue: collectRoutes(router)
	});
}
