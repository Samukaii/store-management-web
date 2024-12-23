import { TestBed } from "@angular/core/testing";
import { buttonLoadingInterceptor } from "./button-loading.interceptor";
import {
	HttpClient,
	HttpErrorResponse,
	HttpEventType,
	HttpResponse,
	provideHttpClient,
	withInterceptors
} from "@angular/common/http";
import { MockProvider } from "ng-mocks";
import {
	ButtonRequestLoadingService
} from "../../../shared/directives/button-request-loading/button-request-loading.service";
import { spyDependency } from "../../../testing/spies/spy-dependency";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { validateRequest } from "../../../testing/utils/validate-request";

const setup = () => {
	TestBed.configureTestingModule({
		providers: [
			provideHttpClient(withInterceptors([buttonLoadingInterceptor])),
			provideHttpClientTesting(),
			MockProvider(ButtonRequestLoadingService),
		]
	});
}

const client = () => TestBed.inject(HttpClient);

describe(buttonLoadingInterceptor.name, () => {
	afterEach(() => {
		TestBed.inject(HttpTestingController).verify();
	})

	describe('When request is successful', () => {
		it('must call finish loading with HttpResponse', () => {
			setup();

			const finishLoading = spyDependency(ButtonRequestLoadingService, 'finishLoading');

			client().get('some-url').subscribe();

			const response = {
				result: ""
			};

			validateRequest({
				url: 'some-url',
				method: 'GET',
				responseType: 'success',
				response: response
			});

			const call = finishLoading.mock.lastCall?.[0] as HttpResponse<any>;

			expect(call.url).toBe('some-url');
			expect(call.type).toBe(HttpEventType.Response);
			expect(call.status).toBe(200);
			expect(call.body).toEqual(response);
		});

		it('must call addLoading with current request and then removeLastClickedButton', () => {
			setup();

			const addLoading = spyDependency(ButtonRequestLoadingService, 'addLoading');
			const removeLastClickedButton = spyDependency(ButtonRequestLoadingService, 'removeLastClickedButton');

			client().get('some-url').subscribe();

			const response = {
				result: ""
			};

			const request = validateRequest({
				url: 'some-url',
				method: 'GET',
				responseType: 'success',
				response: response
			});

			expect(addLoading).toHaveBeenCalledExactlyOnceWith(request.request);
			expect(removeLastClickedButton).toHaveBeenCalledExactlyOnceWith();

			expect(addLoading).toHaveBeenCalledBefore(removeLastClickedButton);
		});
	});

	describe('When request throw error', () => {
		it('must call finish loading and throw the error', () => {
			setup();

			const finishLoading = spyDependency(ButtonRequestLoadingService, 'finishLoading');

			client().get('some-url').subscribe();

			validateRequest({
				url: 'some-url',
				method: 'GET',
				responseType: 'error',
				response: {
					error: "Unexpected error",
					status: 500,
					statusText: "Internal Server Error"
				}
			});

			const call = finishLoading.mock.lastCall?.[0] as HttpErrorResponse;

			expect(call.url).toBe('some-url');
			expect(call.status).toBe(500);
			expect(call.statusText).toBe("Internal Server Error");
			expect(call.error).toBe("Unexpected error");
		});

		it('must call addLoading with current request and then removeLastClickedButton', () => {
			setup();

			const addLoading = spyDependency(ButtonRequestLoadingService, 'addLoading');
			const removeLastClickedButton = spyDependency(ButtonRequestLoadingService, 'removeLastClickedButton');

			client().get('some-url').subscribe();

			const request = validateRequest({
				url: 'some-url',
				method: 'GET',
				responseType: 'error',
				response: {
					error: "Unexpected error",
					status: 500,
					statusText: "Internal Server Error"
				}
			});

			expect(addLoading).toHaveBeenCalledExactlyOnceWith(request.request);
			expect(removeLastClickedButton).toHaveBeenCalledExactlyOnceWith();

			expect(addLoading).toHaveBeenCalledBefore(removeLastClickedButton);
		});
	});
});
