import { inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { RawMaterialsMeasurementUnit } from "../enums/raw-materials-measurement-unit";
import { CustomValidators } from "../../../shared/validators/custom-validators";
import { NavigationContextService } from "../../../core/components/navigation-context/navigation-context.service";
import { FormValue } from "../../../shared/models/form-value";
import { FormPersistenceService } from "../../../core/services/form-persistence/form-persistence.service";

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
