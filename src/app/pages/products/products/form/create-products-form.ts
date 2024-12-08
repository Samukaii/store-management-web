import { inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { FormPersistenceService } from "../../../../core/services/form-persistence/form-persistence.service";

export const createProductsForm = () => {
	const fb = inject(FormBuilder);
	const persistence = inject(FormPersistenceService);

	const form = fb.group({
		name: ["", Validators.required],
		integrationName: [""],
		categoryId: [null as null | number],
	});

	persistence.apply(form, 'products');

	return form;
};
