import { inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { RawMaterialsMeasurementUnit } from "../enums/raw-materials-measurement-unit";
import { CustomValidators } from "src/app/shared/validators/custom-validators";
import { FormPersistenceService } from "src/app/core/services/form-persistence/form-persistence.service";

export const createRawMaterialsForm = () => {
	const fb = inject(FormBuilder);
	const persistenceService = inject(FormPersistenceService);

	const form = fb.group({
		name: ["", Validators.required],
		cost: [null as number | null, Validators.required],
		categoryId: [null as number | null],
		measurementUnit: [RawMaterialsMeasurementUnit.GRAMS, Validators.required],
		quantity: [0, [Validators.required, CustomValidators.greaterThanZero]],
	});

	persistenceService.apply(form, 'raw-materials');

	return form;
};
