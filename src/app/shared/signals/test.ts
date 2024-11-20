import { Observable, of } from "rxjs";

class ResourceStatus {
}

export type ResourceLoaderParams<R>  = Exclude<NoInfer<R>, undefined>;
export type ResourceLoader<T, R> = (param: ResourceLoaderParams<R>) => Observable<T>;

export interface ResourceOptions<T, R> {
	request?: () => R;
	loader: ResourceLoader<T, R>;
}

export const resource = <T, R>(options: ResourceOptions<T, R>)=> {
}
