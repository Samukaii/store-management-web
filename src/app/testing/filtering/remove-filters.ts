import { EntityWithParams } from "../models/entity-with-params";

export const removeFilters = <T>(list: EntityWithParams<T>[]) => {
	return list.map(item => {
		const copy = {...item};

		delete copy.params;

		return copy as T;
	})
}
