import { FormGroup, ValidatorFn } from "@angular/forms";
import { FormControlNames } from "./form-control-names";
import { FormValue } from "./form-value";

export type FormValidation<Form extends FormGroup> = {
	[key in FormControlNames<Form>]: {
		key: key;
		validator: ValidatorFn | 'required';
		enabled: (value: FormValue<Form>) => boolean;
	}
}[FormControlNames<Form>];

