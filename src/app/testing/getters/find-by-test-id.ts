import { getCurrentComponentFixture } from "../current-component-fixture";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { createExtendedDebugElement } from "../create-extended-debug-element";

export const findByTestId = (selector: string, parent?: DebugElement) => {
	const debugElement = parent ?? getCurrentComponentFixture().debugElement;

	const fullSelector = `[data-test-id="${selector}"]`;

	const element = debugElement.query(By.css(fullSelector));

	if(!element) return;

	return createExtendedDebugElement(element);
};
