import { Generic } from "src/app/shared/models/generic";
import { updateRouterSnapshot } from "src/app/testing/utils/mocked-router";

export const testRouter = () => {
	return {
		updateParams: (params: Generic) => {
			updateRouterSnapshot({
				params
			})
		},
		updateQueryParams: (queryParams: Generic) => {
			updateRouterSnapshot({
				queryParams
			})
		},
	}
};
