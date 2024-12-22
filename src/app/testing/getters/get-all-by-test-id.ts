import { DebugElement } from "@angular/core";
import { findAllByTestId } from "./find-all-by-test-id";

export const getAllByTestId = (selector: string, parent?: DebugElement) => {
	const fullSelector = `[data-test-id="${selector}"]`;

	const elements = findAllByTestId(selector, parent);

	if (elements.length===0)
		throw new Error(`No element with selector ${fullSelector} was found`);

	return elements;
};
