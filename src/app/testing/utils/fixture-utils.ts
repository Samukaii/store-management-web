import { getCurrentComponentFixture } from "src/app/testing/core/current-component-fixture";
import { Generic } from "src/app/shared/models/generic";
import { changeInput } from "src/app/testing/core/change-input";
import { createExtendedDebugElement } from "src/app/testing/extenders/create-extended-debug-element";
import { ExtendedRootDebugElement } from "src/app/testing/models/extended-root-debug-element";

export const fixtureUtils = <T extends Generic>() => {
	const fixture = getCurrentComponentFixture<T>();
	const debugElement = createExtendedDebugElement(fixture.debugElement) as ExtendedRootDebugElement<T>;

	debugElement.changeInput = (name, value) => {
		changeInput<T>(name, value);
	};

	debugElement.component = fixture.componentInstance;

	return debugElement;
}
