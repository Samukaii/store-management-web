import { getCurrentComponentFixture } from "src/app/testing/core/current-component-fixture";
import { Generic } from "src/app/shared/models/generic";
import { detectChanges } from "src/app/testing/utils/detect-changes";
import { ComponentInputNames } from "src/app/shared/models/component-input-names";

export const changeInput = <Component extends Generic>(
	key: ComponentInputNames<Component>, value: any) => {
	const {componentRef} = getCurrentComponentFixture();

	componentRef.setInput(key as string, value);
	detectChanges();
}
