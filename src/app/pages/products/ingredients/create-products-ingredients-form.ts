import { inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { FoodInputMeasurementUnit } from "../../food-inputs/enums/food-input-measurement-unit";

export const createProductsIngredientsForm = () => {
	const fb = inject(FormBuilder);

	return fb.group({
		foodInputId: [null as number | null, Validators.required],
		measurementUnit: [FoodInputMeasurementUnit.GRAMS, Validators.required],
		quantity: [null as number | null, Validators.required],
	});
};
