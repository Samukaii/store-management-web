import { DebugElement, Type } from "@angular/core";
import { findByDirective } from "./find-by-directive";

export const getByDirective = <T>(directive: Type<T>, parent?: DebugElement) => {
	const result = findByDirective(directive, parent);

	if(!result)
		throw new Error(`Element with directive ${directive.name} not found`);

	return result;
};
