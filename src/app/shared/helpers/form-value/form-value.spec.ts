import { FormBuilder } from "@angular/forms";
import { TestBed } from "@angular/core/testing";
import { formValue } from "src/app/shared/helpers/form-value/form-value";

describe(formValue.name, () => {
	it('must create a signal starting with control initial value and keep track of changes', () => {
		TestBed.runInInjectionContext(() => {
			const form = new FormBuilder().group({
				name: "Some name",
				cpf: "231.352.432-67"
			});

			const value = formValue(form);

			expect(value()).toEqual({
				name: "Some name",
				cpf: "231.352.432-67"
			});

			form.controls.name.setValue("Other name");

			expect(value()).toEqual({
				name: "Other name",
				cpf: "231.352.432-67"
			});

			form.controls.name.setValue("Other new name");
			form.controls.cpf.setValue("234.653.254-81");

			expect(value()).toEqual({
				name: "Other new name",
				cpf: "234.653.254-81"
			});
		});
	});
});
