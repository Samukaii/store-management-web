import { UrlHelper } from "../helpers/url-helper";
import { injectParams } from "./inject-params";
import { computed } from "@angular/core";

export const injectParametrizedUrl = (url: string) => {
	const params = injectParams();

	return computed(() => UrlHelper.joinParams(url, params()));
}
