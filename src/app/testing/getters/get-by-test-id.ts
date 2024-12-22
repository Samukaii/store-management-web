import { DebugElement } from "@angular/core";
import { findByTestId } from "./find-by-test-id";

export const getByTestId = (selector: string, parent?: DebugElement) => {
	const element = findByTestId(selector, parent);
	const fullSelector = `[data-test-id="${selector}"]`;

	if (!element)
		throw new Error(`Element with selector ${fullSelector} not found`);

	return element;
};
