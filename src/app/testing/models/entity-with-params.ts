import { DeepPartial } from "../../shared/models/deep-partial";
import { Generic } from "../../shared/models/generic";

export type EntityWithParams<T> = DeepPartial<T> & {
	params?: Generic;
}
