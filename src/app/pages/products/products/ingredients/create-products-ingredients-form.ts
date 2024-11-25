import { inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { RawMaterialsMeasurementUnit } from "../../../raw-materials/enums/raw-materials-measurement-unit";
import { ProductIngredientType } from "../enums/product-ingredient-type";

export const createProductsIngredientsForm = () => {
	const fb = inject(FormBuilder);

	return fb.group({
		rawMaterialId: [null as number | null],
		preparationId: [null as number | null],
		customName: [null as string | null],
		customCost: [null as number | null],
		measurementUnit: [RawMaterialsMeasurementUnit.GRAMS],
		ingredientType: [ProductIngredientType.RAW_MATERIAL as ProductIngredientType | null, Validators.required],
		quantity: [null as number | null],
	});
};
