import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Generic } from "../../models/generic";
import { FormModifier } from "src/app/shared/models/form-modifier";
import { isObjectLiteral } from "src/app/shared/helpers/is-object-literal/is-object-literal";

export class FormHelper {
	static patchForm<Form extends FormGroup, Source extends Generic>(form: Form, source: Source, modifiers: FormModifier<Form, Source>[]) {
		Object.entries(form.controls).forEach(([name, control]) => {
			const modifier = modifiers.find(modifier => modifier.key === name);

			if(modifier) return control.setValue(modifier.modifier(source));

			if(name in source) {
				const value = source[name];

				if(control instanceof FormArray && Array.isArray(value)) {
					for (let i = 0; i < value.length; i++) {
						const item = value[i];
						const subControl = control.at(i);

						if(subControl) subControl.patchValue(item);
						else control.push(this.createFormByModel(item));
					}
				}
				else control.setValue(source[name]);
			}
		});
	}

	static createFormByModel(data: unknown): FormGroup | FormArray | FormControl {
		if(Array.isArray(data)) {
			const formArray = new FormArray<any>([]);

			data.forEach(item => {
				formArray.push(this.createFormByModel(item));
			});

			return formArray;
		}

		if(isObjectLiteral(data)) {
			const formGroup = new FormGroup<Generic>({});

			Object.entries(data).forEach(([name, control]) => {
				formGroup.addControl(name, this.createFormByModel(control));
			});

			return formGroup;
		}

		return new FormControl(data);
	}
}
