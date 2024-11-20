import { inject } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";

export const createProductsImportForm = () => {
	return inject(NonNullableFormBuilder).group({
		file: [null as null | File, Validators.required],
	});
}

export type ImportProductsForm = ReturnType<typeof createProductsImportForm>;
export type ImportProductsPayload = ReturnType<ImportProductsForm['getRawValue']>;
