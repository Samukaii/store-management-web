import { FormControl, FormGroup } from "@angular/forms";
import { FormControlsName } from "src/app/shared/models/form-controls-name";

export const getControl = <Form extends FormGroup>(form: Form, name: FormControlsName<Form>) => {
	const control = form.controls[name];

	if (!control)
		throw new Error(`Control with name ${name} not found`);

	return control as FormControl;
}
