import { getCurrentComponentFixture } from "../core/current-component-fixture";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { createExtendedDebugElement } from "../extenders/create-extended-debug-element";

export const findAllByTestId = (selector: string, parent?: DebugElement) => {
	const debugElement = parent ?? getCurrentComponentFixture().debugElement;

	const fullSelector = `[data-test-id="${selector}"]`;

	const elements = debugElement.queryAll(By.css(fullSelector));

	return elements.map(createExtendedDebugElement);
};
