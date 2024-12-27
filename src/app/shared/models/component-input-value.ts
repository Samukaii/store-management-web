import { Generic } from "src/app/shared/models/generic";
import { ComponentInputs } from "src/app/shared/models/component-inputs";

export type ComponentInputValue<Component extends Generic, Input extends keyof ComponentInputs<Component>> =
	ComponentInputs<Component>[Input];
