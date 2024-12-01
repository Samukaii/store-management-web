import { Generic } from "../models/generic";
import { distinctValue } from "./distinct-value";

export const distinctPropertiesAvoidingNull = <Object extends Generic>(properties: (keyof Object)[]) => (prev: Object, curr: Object) => {
	if (properties.some(property => curr[property] === null))
		return true;

	return properties.every(property => distinctValue(prev[property], curr[property]));
}
