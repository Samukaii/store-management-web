import { inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { RawMaterialsMeasurementUnit } from "../../raw-materials/enums/raw-materials-measurement-unit";
import { PreparationIngredientType } from "../enums/preparation-ingredient-type";

export const createPreparationsIngredientsForm = () => {
	const fb = inject(FormBuilder);

	return fb.group({
		ingredientType: [PreparationIngredientType.RAW_MATERIAL as PreparationIngredientType, Validators.required],
		measurementUnit: [RawMaterialsMeasurementUnit.GRAMS as RawMaterialsMeasurementUnit, Validators.required],
		rawMaterialId: [null as number | null],
		customName: [""],
		customCost: [null as number | null],
		quantity: [null as number | null],
	});
};
