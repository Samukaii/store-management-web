import { effect, signal, Signal, WritableSignal } from "@angular/core";
import { Observable, Subscription, take } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

export type ResourceLoaderParams<R> = Exclude<NoInfer<R>, undefined>;
export type ResourceLoader<T, R> = (param: ResourceLoaderParams<R>) => Observable<T>;

export type ResourceOptions<Source, RequestValue, InitialValue extends Source | undefined> = {
	request?: () => RequestValue;
	initialValue?: InitialValue;
	loader: ResourceLoader<Source, RequestValue>;
}

interface Resource<Source, InitialValue> {
	data: WritableSignal<InitialValue extends Source ? Source : Source | null>,
	isLoading: Signal<boolean>,
	error: Signal<string>,
	refresh: () => void
}

export const resource = <Source, RequestValue, InitialValue extends Source | undefined>(options: ResourceOptions<Source, RequestValue, InitialValue>) => {
	const data = signal<Source | null>(options.initialValue ?? null);
	const isLoading = signal(false);
	const error = signal<any>({});
	let lastSubscription: Subscription | undefined;

	const refresh = () => {
		const params = options?.request?.() as Exclude<NoInfer<RequestValue>, undefined>;

		lastSubscription?.unsubscribe();

		isLoading.set(true);
		lastSubscription = options.loader(params).pipe(take(1)).subscribe({
			next: value => {
				data.set(value);
				isLoading.set(false);
			},
			error: (errorResponse: HttpErrorResponse) => {
				error.set(errorResponse.error)
				isLoading.set(false);
			}
		})
	}

	if ('request' in options) {
		effect(() => refresh(), {allowSignalWrites: true});
	} else refresh();

	return {
		data,
		error,
		isLoading,
		refresh
	} as any as Resource<Source, InitialValue>
}
