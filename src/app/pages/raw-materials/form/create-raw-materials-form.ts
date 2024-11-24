import { inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { RawMaterialsMeasurementUnit } from "../enums/raw-materials-measurement-unit";

export const createRawMaterialsForm = () => {
	const fb = inject(FormBuilder);

	return fb.group({
		name: ["", Validators.required],
		cost: [null as number | null, Validators.required],
		measurementUnit: [RawMaterialsMeasurementUnit.GRAMS, Validators.required],
		quantity: [1000, Validators.required],
	});
};
