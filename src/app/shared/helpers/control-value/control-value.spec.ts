import { controlValue } from "src/app/shared/helpers/control-value/control-value";
import { FormBuilder } from "@angular/forms";
import { TestBed } from "@angular/core/testing";

describe(controlValue.name, () => {
	it('must create a signal starting with control initial value and keep track of changes', () => {
		TestBed.runInInjectionContext(() => {
			const form = new FormBuilder().group({
				name: "Some value"
			});

			const value = controlValue(form, 'name');
			expect(value()).toBe("Some value");

			form.controls.name.setValue("Other value");
			expect(value()).toBe("Other value");

			form.controls.name.setValue("Other new value");
			expect(value()).toBe("Other new value");
		});
	});
});
