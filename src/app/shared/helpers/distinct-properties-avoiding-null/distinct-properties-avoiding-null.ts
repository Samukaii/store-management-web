import { distinctValue } from "src/app/shared/helpers/distinct-value/distinct-value";
import { Generic } from "src/app/shared/models/generic";

export const distinctPropertiesAvoidingNull = <Object extends Generic>(properties: (keyof Object)[]) => (prev: Object, curr: Object) => {
	if (properties.some(property => curr[property] === null))
		return true;

	return properties.every(property => distinctValue(prev[property], curr[property]));
}
