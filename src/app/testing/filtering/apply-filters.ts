import { EntityWithParams } from "../models/entity-with-params";
import { Generic } from "../../shared/models/generic";

export const applyFilters = <T>(list: EntityWithParams<T>[], params: Generic = {}) => {
	return list.filter(item => {
		const conditions: boolean[] = [];

		Object.entries(params).forEach(([key, value]) => {
			if (key==="sortProperty" || key==="sortDirection") return;

			if (!item.params) return conditions.push(false);

			return conditions.push(item.params[key]===value);
		})

		return conditions.every(condition => condition);
	});
}
