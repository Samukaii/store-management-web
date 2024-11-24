import { inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { RawMaterialsMeasurementUnit } from "../../raw-materials/enums/raw-materials-measurement-unit";

export const createPreparationsIngredientsForm = () => {
	const fb = inject(FormBuilder);

	return fb.group({
		rawMaterialId: [null as number | null, Validators.required],
		measurementUnit: [RawMaterialsMeasurementUnit.GRAMS, Validators.required],
		quantity: [null as number | null, Validators.required],
	});
};
