import { inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

export const injectRouterActions = () => {
	const route = inject(ActivatedRoute);
	const router = inject(Router);

	const goBack = () => {
		router.navigate(['../'], {relativeTo: route});
	};

	const goToSingle = (id: number) => {
		router.navigate([id], {relativeTo: route});
	};

	const goToSingleTab = (id: number, tab: number) => {
		router.navigate([id], {
			relativeTo: route,
			queryParams: {tab}
		});
	};

	return {goBack, goToSingle, goToSingleTab};
};
