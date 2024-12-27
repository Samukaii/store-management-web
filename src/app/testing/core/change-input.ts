import { getCurrentComponentFixture } from "src/app/testing/core/current-component-fixture";
import { ComponentInputs } from "src/app/shared/models/component-inputs";
import { Generic } from "src/app/shared/models/generic";
import { ComponentInputValue } from "src/app/shared/models/component-input-value";
import { detectChanges } from "src/app/testing/utils/detect-changes";

export const changeInput = <T extends Generic, K extends keyof ComponentInputs<T>>(
	key: K, value: ComponentInputValue<T, K>) => {
	const {componentRef} = getCurrentComponentFixture();

	componentRef.setInput(key as string, value);
	detectChanges();
}
