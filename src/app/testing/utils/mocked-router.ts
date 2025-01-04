import { DeepPartial } from "src/app/shared/models/deep-partial";
import { ActivatedRouteSnapshot, NavigationEnd, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

const events = new BehaviorSubject<NavigationEnd>(new NavigationEnd(0, '', ''));

let router = {
	events,
	routerState: {
		snapshot: {
			root: {
				children: [],
				data: {},
			} as DeepPartial<ActivatedRouteSnapshot>
		}
	},
	navigateByUrl: jest.fn(),
	navigate: jest.fn()
};

export const updateRouterSnapshot = (snapshot: DeepPartial<ActivatedRouteSnapshot>) => {
	router.routerState.snapshot.root = {
		...router.routerState.snapshot.root,
		...snapshot
	};

	events.next(new NavigationEnd(0, '', ''));
}

export const getMockedRouter = () => {
	return router as unknown as Router;
}

export const resetRouterSnapshot = () => {
	router.routerState.snapshot.root = {
		children: [],
		data: {},
	};

	router.navigateByUrl.mockReset();
	router.navigate.mockReset();
}
