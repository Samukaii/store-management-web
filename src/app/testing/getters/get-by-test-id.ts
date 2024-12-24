import { DebugElement } from "@angular/core";
import { findByTestId } from "./find-by-test-id";

export const getByTestId = <T = unknown>(selector: string, parent?: DebugElement) => {
	const element = findByTestId<T>(selector, parent);
	const fullSelector = `[data-test-id="${selector}"]`;

	if (!element)
		throw new Error(`Element with selector ${fullSelector} not found`);

	return element;
};
