import { inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

export const createOrdersForm = () => {
	const fb = inject(FormBuilder);

	return fb.group({
		name: ["", Validators.required],
	});
};
