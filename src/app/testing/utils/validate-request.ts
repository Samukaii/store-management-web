import { MatchRequestCallOptions } from "../models/match-request-call-options";
import { TestBed } from "@angular/core/testing";
import { HttpTestingController } from "@angular/common/http/testing";
import { HttpParams } from "@angular/common/http";

export const validateRequest = (options: MatchRequestCallOptions) => {
	const controller = TestBed.inject(HttpTestingController);

	let url = options.url;

	if (options.queryParams) {
		url += "?";
		const httpParams = new HttpParams({
			fromObject: options.queryParams,
		});

		url += httpParams.toString();
	}

	const request = controller.expectOne({
		url,
		method: options.method
	});

	if (options.body) {
		expect(request.request.body).toEqual(options.body);
	}

	if (options.responseType==='error')
		request.flush(options.response.error, {
			status: options.response.status,
			statusText: options.response.statusText
		});
	else request.flush(options.response);


	controller.verify();

	return request;
}
