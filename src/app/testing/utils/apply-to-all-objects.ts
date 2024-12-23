import { DeepPartial } from "../../shared/models/deep-partial";

export const applyToAllObjects = <T>(list: T[], changes: DeepPartial<T>) => {
	return list.map(item => {
		return {
			...changes,
			...item
		}
	});
}
