import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from "@angular/core";
import {
	ButtonRequestLoadingService
} from "src/app/shared/directives/button-request-loading/button-request-loading.service";
import { catchError, ObservableInput, tap } from "rxjs";

export const buttonLoadingInterceptor: HttpInterceptorFn = (req, next) => {
	const formButtonService = inject(ButtonRequestLoadingService);

	formButtonService.addLoading(req);

	return next(req).pipe(
		catchError((error: HttpErrorResponse): ObservableInput<any>=> {
			formButtonService.finishLoading(error);
			throw error;
		}),
		tap({
			next: (response: HttpResponse<any>) => {
				formButtonService.finishLoading(response);
			},
		})
	);
};
