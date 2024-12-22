import { getCurrentComponentFixture } from "../current-component-fixture";
import { By } from "@angular/platform-browser";
import { DebugElement, Type } from "@angular/core";
import { createExtendedDebugElement } from "../create-extended-debug-element";

export const findByDirective = <T>(directive: Type<T>, parent?: DebugElement) => {
	const debugElement = parent ?? getCurrentComponentFixture().debugElement;
	const element = debugElement.query(By.directive(directive));

	if(!element) return;

	return createExtendedDebugElement<T>(element);
};
