import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, ObservableInput } from "rxjs";
import { inject } from "@angular/core";
import { isBasicError } from "../../error-handling/matchers/is-basic-error";
import { ErrorsService } from "../../error-handling/errors.service";
import { isArgumentError } from "../../error-handling/matchers/is-argument-error";
import { SnackbarService } from "src/app/shared/services/snackbar/snackbar.service";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
	const snackbar = inject(SnackbarService);
	const errorsService = inject(ErrorsService);

	errorsService.clearErrors();

	return next(req).pipe(
		catchError((errorResponse: HttpErrorResponse): ObservableInput<any>=> {
			const error = errorResponse.error.applicationError;

			if(!error) {
				snackbar.open({
					message: "Oops! Parece que tivemos um problema inesperado! Por favor, entre em contato com o suporte",
					level: "error",
				});

				throw errorResponse;
			}

			if(isBasicError(error)) {
				snackbar.open({
					message: error.message,
					level: "error",
				});
			}

			if(isArgumentError(error)) {
				errorsService.setErrors(error.messages);
			}

			throw errorResponse;
		}),
	);
};
