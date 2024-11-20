import { inject } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";

export const createOrdersImportForm = () => {
	return inject(NonNullableFormBuilder).group({
		file: [null as null | File, Validators.required],
	});
}

export type OrdersItemsForm = ReturnType<typeof createOrdersImportForm>;
export type ImportOrdersPayload = ReturnType<OrdersItemsForm['getRawValue']>;
