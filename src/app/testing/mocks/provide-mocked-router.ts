import { of, Subject } from "rxjs";
import { ActivatedRouteSnapshot, NavigationEnd, Router } from "@angular/router";
import { DeepPartial } from "../../shared/models/deep-partial";

export const provideMockedRouter = (routeSnapShot?: DeepPartial<ActivatedRouteSnapshot>) => {
	const events = new Subject<NavigationEnd>();

	const router = {
		events,
		routerState: {
			snapshot: {
				root: {
					children: [],
					data: {},
					...routeSnapShot
				}
			}
		},
		navigateByUrl: () => {}
	};

	events.next(new NavigationEnd(0, '', ''));

	return {
		provide: Router,
		useValue: router
	}
};
