import { ActivatedRoute, ActivatedRouteSnapshot, Router } from "@angular/router";
import { DeepPartial } from "../../shared/models/deep-partial";
import { MockProvider } from "ng-mocks";
import { getMockedRouter, updateRouterSnapshot } from "src/app/testing/utils/mocked-router";

export const mockRouter = (routeSnapShot?: DeepPartial<ActivatedRouteSnapshot>) => {
	const router = getMockedRouter();

	updateRouterSnapshot(routeSnapShot ?? {})

	return [
		{
			provide: Router,
			useValue: router
		},
		MockProvider(ActivatedRoute)
	]
};
