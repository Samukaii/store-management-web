import { inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { FormPersistenceService } from "src/app/core/services/form-persistence/form-persistence.service";

export const createProductsCategoriesForm = () => {
	const fb = inject(FormBuilder);
	const persistence = inject(FormPersistenceService);

	const form = fb.group({
		name: ["", Validators.required],
	});

	persistence.apply(form, 'products:categories');

	return form;
};
