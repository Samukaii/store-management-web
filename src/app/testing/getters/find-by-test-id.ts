import { getCurrentComponentFixture } from "../core/current-component-fixture";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { createExtendedDebugElement } from "../extenders/create-extended-debug-element";

export const findByTestId = <T = unknown>(selector: string, parent?: DebugElement) => {
	const debugElement = parent ?? getCurrentComponentFixture().debugElement;

	const fullSelector = `[data-test-id="${selector}"]`;

	const element = debugElement.query(By.css(fullSelector));

	if(!element) return;

	return createExtendedDebugElement<T>(element);
};
