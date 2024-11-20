import { reflectComponentType, Type } from "@angular/core";

export const componentOutputExists = (component: Type<any>, inputName: string) => {
	const mirror = reflectComponentType(component);

	return !!mirror?.outputs.find(input => input.templateName === inputName);
}
