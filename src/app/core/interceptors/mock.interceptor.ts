import { HttpEvent, HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable, of } from "rxjs";
import { RandomGenerator } from "../../shared/helpers/random-generator";
import { Identifiable } from "../../shared/models/identifiable";
import { injectIsAtBrowser } from "../../shared/di/inject-is-at-browser";
import { removeUrlParameters } from "../../shared/helpers/remove-url-parameters";
import { compareUrls } from "../../shared/helpers/compare-urls";
import { MockInterceptorConfig } from "./models/mock-interceptor-config";


const getData = (config: MockInterceptorConfig)=> {
	const isAtBrowser = injectIsAtBrowser();

	if(!isAtBrowser)
		return [];

	const persisted = localStorage.getItem(config.baseUrl);

	if(persisted)
		return JSON.parse(persisted) as Identifiable[];

	const data = RandomGenerator.array(config.schema, config.count ?? 25) as Identifiable[];

	localStorage.setItem(config.baseUrl, JSON.stringify(data));

	return data;
}


export const mockInterceptor = (configs: MockInterceptorConfig[]): HttpInterceptorFn => {
	return (req, next): Observable<HttpEvent<any>> => {
		let cleanUrl = removeUrlParameters(req.url.replace(environment.api, ''));
		cleanUrl = cleanUrl.startsWith('/') ? cleanUrl.slice(1) : cleanUrl;

		for (const config of configs) {
			const allData = getData(config);

			let urlParams = compareUrls(config.baseUrl, cleanUrl);

			if (urlParams)
				return of(new HttpResponse({
					body: allData
				}));

			urlParams = compareUrls(`${config.baseUrl}/:singleId`, cleanUrl);

			if (urlParams)
				return of(new HttpResponse({
					body: allData.find(item => (item as Identifiable).id === parseInt(urlParams['singleId']))
				}));
		}

		return next(req);
	};
}

