import { getCurrentComponentFixture } from "src/app/testing/core/current-component-fixture";
import { createExtendedDebugElement } from "src/app/testing/extenders/create-extended-debug-element";
import { ComponentInputs } from "src/app/shared/models/component-inputs";
import { ComponentInputValue } from "src/app/shared/models/component-input-value";
import { Generic } from "src/app/shared/models/generic";
import { changeInput } from "src/app/testing/core/change-input";

export const fixtureUtils = <T extends Generic>() => {
	const fixture = getCurrentComponentFixture<T>();

	return {
		component: fixture.componentInstance,
		changeInput: <K extends keyof ComponentInputs<T>>(name: K, value: ComponentInputValue<T, K>) => {
			changeInput(name as any, value);
		},
		...createExtendedDebugElement(fixture.debugElement)
	}
}
