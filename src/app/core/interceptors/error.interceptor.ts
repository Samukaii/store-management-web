import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, ObservableInput, of } from "rxjs";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
	return next(req).pipe(
		catchError((error: HttpErrorResponse): ObservableInput<any>=> {
			console.log(error);

			return of({});
		}),
	);
};
