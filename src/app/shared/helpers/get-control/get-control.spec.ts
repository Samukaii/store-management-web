import { FormControl, FormGroup } from '@angular/forms';
import { getControl } from "src/app/shared/helpers/get-control/get-control";

describe(getControl.name, () => {
	it('should return the control if it exists in the form', () => {
		const form = new FormGroup({
			name: new FormControl('John Doe'),
		});

		const control = getControl(form, 'name');
		expect(control).toBeDefined();
		expect(control.value).toBe('John Doe');
	});

	it('should throw an error if the control does not exist in the form', () => {
		const form = new FormGroup({
			name: new FormControl('John Doe'),
		});

		expect(() => getControl(form, 'email' as any)).toThrow('Control with name "email" not found');
	});

	it('should return the correct type for the control', () => {
		const form = new FormGroup({
			age: new FormControl(30),
		});

		const control = getControl(form, 'age');
		expect(control).toBeInstanceOf(FormControl);
		expect(typeof control.value).toBe('number');
	});
});
