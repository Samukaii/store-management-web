import { FormGroup } from "@angular/forms";
import { FormControlNames } from "./form-control-names";
import { Generic } from "./generic";
import { FormControlValue } from "./form-control-value";

export type FormModifier<Form extends FormGroup, Source extends Generic> = {
	[key in FormControlNames<Form>]: {
		key: key;
		modifier: (source: Source) => FormControlValue<Form, key>
	}
}[FormControlNames<Form>];

