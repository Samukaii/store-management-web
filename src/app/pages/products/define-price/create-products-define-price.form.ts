import { inject } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Product } from "../models/product";

export const createProductsDefinePriceForm = (product: Product) => {
	return inject(NonNullableFormBuilder).group({
		price: [product?.price ?? product?.suggestedPrice ?? 0, Validators.required],
	});
}

export type ProductsDefinePriceForm = ReturnType<typeof createProductsDefinePriceForm>;
export type ProductsDefinePricePayload = ReturnType<ProductsDefinePriceForm["getRawValue"]>;
