import { inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { FormPersistenceService } from "../src/app/core/services/form-persistence/form-persistence.service";

export const createRawMaterialsCategoriesForm = () => {
	const fb = inject(FormBuilder);
	const persistenceService = inject(FormPersistenceService);

	const form = fb.group({
		name: ["", Validators.required],
	});

	persistenceService.apply(form, 'raw-materials:categories');

	return form;
};
