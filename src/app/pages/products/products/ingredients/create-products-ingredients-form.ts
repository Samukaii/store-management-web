import { inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { RawMaterialsMeasurementUnit } from "../../../raw-materials/enums/raw-materials-measurement-unit";
import { ProductIngredientType } from "../enums/product-ingredient-type";
import { FormPersistenceService } from "src/app/core/services/form-persistence/form-persistence.service";

export const createProductsIngredientsForm = () => {
	const fb = inject(FormBuilder);
	const persistence = inject(FormPersistenceService);

	const form = fb.group({
		rawMaterialId: [null as number | null],
		preparationId: [null as number | null],
		customName: [null as string | null],
		customCost: [null as number | null],
		measurementUnit: [RawMaterialsMeasurementUnit.GRAMS],
		ingredientType: [ProductIngredientType.RAW_MATERIAL as ProductIngredientType | null, Validators.required],
		quantity: [null as number | null],
	});

	persistence.apply(form, 'products:ingredients');

	return form;
};
