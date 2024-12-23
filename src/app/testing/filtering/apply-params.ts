import { applySorting } from "./apply-sorting";
import { applyFilters } from "./apply-filters";
import { removeFilters } from "./remove-filters";
import { EntityWithParams } from "../models/entity-with-params";
import { Generic } from "../../shared/models/generic";

export const applyParams = <T>(list: EntityWithParams<T>[], params: Generic = {}) => {
	const sorted = applySorting(list, params);
	const filtered = applyFilters(sorted, params);

	return removeFilters(filtered);
}
