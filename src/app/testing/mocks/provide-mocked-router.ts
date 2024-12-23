import { BehaviorSubject, of, Subject } from "rxjs";
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router } from "@angular/router";
import { DeepPartial } from "../../shared/models/deep-partial";
import { MockProvider } from "ng-mocks";

export const provideMockedRouter = (routeSnapShot?: DeepPartial<ActivatedRouteSnapshot>) => {
	const events = new BehaviorSubject<NavigationEnd>(new NavigationEnd(0, '', ''));

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
		navigateByUrl: () => {},
		navigate: () => {}
	};

	events.next(new NavigationEnd(0, '', ''));

	return [
		{
			provide: Router,
			useValue: router
		},
		MockProvider(ActivatedRoute)
	]
};
