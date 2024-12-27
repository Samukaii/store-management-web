import { MockProvider } from "ng-mocks";
import { ErrorsService } from "src/app/core/error-handling/errors.service";
import { BehaviorSubject, map } from "rxjs";
import { Generic } from "src/app/shared/models/generic";

export const mockErrorsService = () => {
	const errors$ = new BehaviorSubject<Generic>({});

	return MockProvider(ErrorsService, {
		watchFieldError: (fieldName: string) => {
			return errors$.pipe(
				map(errors => errors[fieldName]),
			);
		},
		setErrors: (errors: Generic) => {
			errors$.next(errors);
		},
	})
};
