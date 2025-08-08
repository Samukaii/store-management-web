import { inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

export const createOrdersForm = () => {
	const fb = inject(FormBuilder);

	return fb.group({
		date: ["", Validators.required],
		items: fb.array([
			fb.group({
				productId: [null as null | number, Validators.required],
				quantity: [null as null | number, Validators.required],
			})
		])
	});
};
