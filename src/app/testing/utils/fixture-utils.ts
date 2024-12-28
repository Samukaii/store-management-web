import { getCurrentComponentFixture } from "src/app/testing/core/current-component-fixture";
import { ComponentInputs } from "src/app/shared/models/component-inputs";
import { ComponentInputValue } from "src/app/shared/models/component-input-value";
import { Generic } from "src/app/shared/models/generic";
import { changeInput } from "src/app/testing/core/change-input";
import { ExtendedDebugElement } from "src/app/testing/models/extended-debug-element";
import { createExtendedDebugElement } from "src/app/testing/extenders/create-extended-debug-element";

interface ExtendedRootDebugElement<T extends Generic> extends ExtendedDebugElement<T> {
	component: T,
	changeInput: <K extends keyof ComponentInputs<T>>(name: K, value: ComponentInputValue<T, K>) => void;
}

export const fixtureUtils = <T extends Generic>() => {
	const fixture = getCurrentComponentFixture<T>();
	const debugElement = createExtendedDebugElement(fixture.debugElement) as ExtendedRootDebugElement<T>;

	debugElement.changeInput = (name, value) => {
		changeInput<T>(name, value);
	};

	debugElement.component = fixture.componentInstance;

	return debugElement;
}
