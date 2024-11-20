import { ComponentInputs } from "../../models/component-inputs";
import { ComponentOutputs } from "../../models/component-outputs";

export type ComponentDialogData<T> = ComponentInputs<T> & ComponentOutputs<T>;
