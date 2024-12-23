import { TestBed } from "@angular/core/testing";
import { HttpClient, provideHttpClient, withInterceptors } from "@angular/common/http";
import { MockProvider } from "ng-mocks";
import { spyDependency } from "../../../testing/spies/spy-dependency";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { validateRequest } from "../../../testing/utils/validate-request";
import { errorInterceptor } from "./error.interceptor";
import { SnackbarService } from "../../../shared/services/snackbar/snackbar.service";
import { ErrorsService } from "../../error-handling/errors.service";
import { ApplicationErrorType } from "../../error-handling/enumerations/application-error-type";

const setup = () => {
	TestBed.configureTestingModule({
		providers: [
			provideHttpClient(withInterceptors([errorInterceptor])),
			provideHttpClientTesting(),
			MockProvider(SnackbarService),
			MockProvider(ErrorsService),
		]
	});
}

const client = () => TestBed.inject(HttpClient);

describe(errorInterceptor.name, () => {
	afterEach(() => {
		TestBed.inject(HttpTestingController).verify();
	})

	describe('When request throw error', () => {
		describe('If is a basic error', () => {
			it('must call clear errors', () => {
				setup();

				const clearErrors = spyDependency(ErrorsService, 'clearErrors');

				client().get('some-url').subscribe();

				validateRequest({
					url: 'some-url',
					method: 'GET',
					responseType: 'error',
					response: {
						error: {
							applicationError: {
								message: "Some resource was not found",
								type: ApplicationErrorType.BASIC
							},
						},
						status: 404,
						statusText: "Not Found"
					}
				});

				expect(clearErrors).toHaveBeenCalledExactlyOnceWith();
			});

			it('must open a snackbar with error message and error level and do not call setErrors', () => {
				setup();

				const open = spyDependency(SnackbarService, 'open');
				const setErrors = spyDependency(ErrorsService, 'setErrors');

				client().get('some-url').subscribe();

				validateRequest({
					url: 'some-url',
					method: 'GET',
					responseType: 'error',
					response: {
						error: {
							applicationError: {
								message: "Some resource was not found",
								type: ApplicationErrorType.BASIC
							},
						},
						status: 404,
						statusText: "Not Found"
					}
				});

				expect(open).toHaveBeenCalledExactlyOnceWith({
					message: 'Some resource was not found',
					level: 'error'
				});

				expect(setErrors).not.toHaveBeenCalled();
			});
		});

		describe('If is an argument error', () => {
			it('must call clear errors', () => {
				setup();

				const clearErrors = spyDependency(ErrorsService, 'clearErrors');

				client().get('some-url').subscribe();

				validateRequest({
					url: 'some-url',
					method: 'GET',
					responseType: 'error',
					response: {
						error: {
							applicationError: {
								messages: {
									name: "Name is required",
								},
								type: ApplicationErrorType.ARGUMENT
							},
						},
						status: 422,
						statusText: "Unprocessable entity"
					}
				});

				expect(clearErrors).toHaveBeenCalledExactlyOnceWith();
			});

			it('must call setErrors with error messages and do not open any snackbar', () => {
				setup();

				const open = spyDependency(SnackbarService, 'open');
				const setErrors = spyDependency(ErrorsService, 'setErrors');

				client().get('some-url').subscribe();

				validateRequest({
					url: 'some-url',
					method: 'GET',
					responseType: 'error',
					response: {
						error: {
							applicationError: {
								messages: {
									name: "Name is required",
								},
								type: ApplicationErrorType.ARGUMENT
							},
						},
						status: 422,
						statusText: "Unprocessable entity"
					}
				});

				expect(setErrors).toHaveBeenCalledExactlyOnceWith({
					name: "Name is required",
				});

				expect(open).not.toHaveBeenCalled();
			});
		});

		describe('If is an unknown error', () => {
			it('must call clear errors', () => {
				setup();

				const clearErrors = spyDependency(ErrorsService, 'clearErrors');

				client().get('some-url').subscribe();

				validateRequest({
					url: 'some-url',
					method: 'GET',
					responseType: 'error',
					response: {
						error: {
							message: "Unknown error",
						},
						status: 500,
						statusText: "Internal Server Error"
					}
				});

				expect(clearErrors).toHaveBeenCalledExactlyOnceWith();
			});

			it('must open a snackbar with specific message and error level and do not call setErrors', () => {
				setup();

				const open = spyDependency(SnackbarService, 'open');
				const setErrors = spyDependency(ErrorsService, 'setErrors');

				client().get('some-url').subscribe();

				validateRequest({
					url: 'some-url',
					method: 'GET',
					responseType: 'error',
					response: {
						error: {
							message: "Unknown error",
						},
						status: 500,
						statusText: "Internal Server Error"
					}
				});

				expect(open).toHaveBeenCalledExactlyOnceWith({
					message: 'Oops! Parece que tivemos um problema inesperado! Por favor, entre em contato com o suporte',
					level: 'error'
				});

				expect(setErrors).not.toHaveBeenCalled();
			});
		});
	});

	describe('When request is successful', () => {
		it('must call clear errors', () => {
			setup();

			const clearErrors = spyDependency(ErrorsService, 'clearErrors');

			client().get('some-url').subscribe();

			validateRequest({
				url: 'some-url',
				method: 'GET',
				responseType: 'success',
				response: {
					result: ""
				}
			});

			expect(clearErrors).toHaveBeenCalledExactlyOnceWith();
		});

		it('must not call setErrors and do not open any snackbar', () => {
			setup();

			const open = spyDependency(SnackbarService, 'open');
			const setErrors = spyDependency(ErrorsService, 'setErrors');

			client().get('some-url').subscribe();

			validateRequest({
				url: 'some-url',
				method: 'GET',
				responseType: 'success',
				response: {
					result: ""
				}
			});

			expect(open).not.toHaveBeenCalled();
			expect(setErrors).not.toHaveBeenCalled();
		});
	});
});
