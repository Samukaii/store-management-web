import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from "@angular/core";
import {
	ButtonRequestLoadingService
} from "../../shared/directives/button-request-loading/button-request-loading.service";
import { catchError, filter, ObservableInput, tap } from "rxjs";

export const buttonLoadingInterceptor: HttpInterceptorFn = (req, next) => {
	const formButtonService = inject(ButtonRequestLoadingService);

	formButtonService.addLoading(req);
	formButtonService.removeLastClickedButton();

	const event = next(req);

	event.pipe(
		filter(event => event instanceof HttpResponse)
	)

	return next(req).pipe(
		catchError((error: HttpErrorResponse): ObservableInput<any>=> {
			throw error;
		}),
		tap({
			next: (response: HttpResponse<any>) => {
				formButtonService.finishLoading(response);
			},
		})
	);
};