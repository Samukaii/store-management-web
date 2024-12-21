import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class ErrorsService {
	private errors$ = new BehaviorSubject<Record<string, string>>({});

	setErrors(errors: Record<string, string>) {
		this.errors$.next(errors);
	}

	watchFieldError(fieldName: string) {
		return this.errors$.pipe(
			map(errors => errors[fieldName] ?? null),
		);
	}

	clearFieldError(fieldName: string) {
		const errors = this.errors$.value;

		delete errors[fieldName];

		this.errors$.next(errors);
	}

	clearErrors(){
		this.errors$.next({});
	}
}
