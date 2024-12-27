import { DebugElement } from "@angular/core";
import { ExtendedDebugElement } from "../models/extended-debug-element";
import { getByDirective } from "../getters/get-by-directive";
import { getByTestId } from "../getters/get-by-test-id";
import { getAllByTestId } from "../getters/get-all-by-test-id";
import { findByDirective } from "../getters/find-by-directive";
import { findByTestId } from "../getters/find-by-test-id";
import { findAllByTestId } from "../getters/find-all-by-test-id";

export const createExtendedDebugElement = <T>(element: DebugElement) => {
	const result = element as ExtendedDebugElement<T>;

	result.getByDirective = (directive) => getByDirective(directive, result);
	result.getByTestId = (selector: string) => getByTestId(selector, result);
	result.getAllByTestId = (selector: string) => getAllByTestId(selector, result);

	result.findByDirective = (directive) => findByDirective(directive, result);
	result.findByTestId = (selector: string) => findByTestId(selector, result);
	result.findAllByTestId = (selector: string) => findAllByTestId(selector, result);

	result.text = () => result.nativeElement.textContent?.trim() ?? "";
	result.getProperty = (property) => result.properties[property] ?? result.attributes[property] ?? null;

	result.read = (token) => result.injector.get(token)

	return result;
};
