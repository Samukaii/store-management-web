import { FormGroup } from "@angular/forms";
import { toSignal } from "@angular/core/rxjs-interop";

export const formValue = <Form extends FormGroup>(form: Form) => {
	return toSignal<ReturnType<Form['getRawValue']>, ReturnType<Form['getRawValue']>>(form.valueChanges, {initialValue: form.getRawValue()});
}
