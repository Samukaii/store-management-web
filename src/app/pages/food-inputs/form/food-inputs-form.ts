import { inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { FoodInputMeasurementUnit } from "../enums/food-input-measurement-unit";

export const createFoodInputsForm = () => {
	const fb = inject(FormBuilder);

	return fb.group({
		name: ["", Validators.required],
		cost: [null as number | null, Validators.required],
		measurementUnit: [FoodInputMeasurementUnit.GRAMS, Validators.required],
		quantity: [1000, Validators.required],
	});
};
