import { inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

export const createPreparationsForm = () => {
	const fb = inject(FormBuilder);

	return fb.group({
		name: ["", Validators.required],
		quantity: [0],
	});
};
