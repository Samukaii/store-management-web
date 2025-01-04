import { Injectable } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Generic } from "src/app/shared/models/generic";
import { FormKeyOptions } from "./models/form-key-options";

@Injectable({
	providedIn: 'root'
})
export class FormPersistenceService {
	private persisted = new Map<FormKeyOptions, Generic>();

	add(name: FormKeyOptions, value: Generic) {
		this.persisted.set(name, value);
	}

	get(name: FormKeyOptions) {
		return this.persisted.get(name);
	}

	apply(form: FormGroup, name: FormKeyOptions) {
		const value = this.persisted.get(name);

		if(value) {
			this.persisted.delete(name);
			form.patchValue(value);
			form.markAsDirty();
		}
	}
}
