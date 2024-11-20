import { computed } from "@angular/core";
import { injectQueryParams } from "./inject-query-params";

export const injectSpecificQueryParam = (queryParam: string) => {
	const params = injectQueryParams();

	return computed(() => params()[queryParam] as string | undefined);
}
