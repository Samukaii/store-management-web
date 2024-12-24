import { FormGroup } from "@angular/forms";
import { Generic } from "../../models/generic";
import { FormModifier } from "src/app/shared/models/form-modifier";

export class FormHelper {
	static patchForm<Form extends FormGroup, Source extends Generic>(form: Form, source: Source, modifiers: FormModifier<Form, Source>[]) {
		Object.entries(form.controls).forEach(([name, control]) => {
			const modifier = modifiers.find(modifier => modifier.key === name);

			if(modifier) return control.setValue(modifier.modifier(source));

			if(name in source) control.setValue(source[name]);
		});
	}
}
