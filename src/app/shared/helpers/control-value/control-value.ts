import { FormGroup } from "@angular/forms";
import { toSignal } from "@angular/core/rxjs-interop";

export const controlValue = <Form extends FormGroup, Key extends keyof Form['controls']>(form: Form, key: Key) => {
	const control = form.get(key as string)!;
	type ControlValue = Form['controls'][Key]['value'];

	return toSignal<ControlValue, ControlValue>(control.valueChanges, {initialValue: control.value});
}
