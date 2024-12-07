import { inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { RawMaterialsMeasurementUnit } from "../enums/raw-materials-measurement-unit";
import { CustomValidators } from "../../../shared/validators/custom-validators";

export const createRawMaterialsForm = () => {
	const fb = inject(FormBuilder);

	return fb.group({
		name: ["", Validators.required],
		cost: [null as number | null, Validators.required],
		categoryId: [null as number | null],
		measurementUnit: [RawMaterialsMeasurementUnit.GRAMS, Validators.required],
		quantity: [0, [Validators.required, CustomValidators.greaterThanZero]],
	});
};
