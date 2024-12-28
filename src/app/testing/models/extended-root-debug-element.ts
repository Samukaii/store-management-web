import { Generic } from "src/app/shared/models/generic";
import { ExtendedDebugElement } from "src/app/testing/models/extended-debug-element";
import { ComponentInputs } from "src/app/shared/models/component-inputs";
import { ComponentInputValue } from "src/app/shared/models/component-input-value";

export interface ExtendedRootDebugElement<T extends Generic> extends ExtendedDebugElement<T> {
	component: T,
	changeInput: <K extends keyof ComponentInputs<T>>(name: K, value: ComponentInputValue<T, K>) => void;
}
