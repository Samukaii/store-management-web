import { reflectComponentType, Type } from "@angular/core";

export const componentInputExists = (component: Type<any>, inputName: string) => {
	const mirror = reflectComponentType(component);

	return !!mirror?.inputs.find(input => input.templateName === inputName);
}
