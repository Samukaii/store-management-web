import { inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

export const createProductsForm = () => {
	const fb = inject(FormBuilder);

	return fb.group({
		name: ["", Validators.required],
		integrationName: [""],
		categoryId: [null as null | number, Validators.required],
	});
};
