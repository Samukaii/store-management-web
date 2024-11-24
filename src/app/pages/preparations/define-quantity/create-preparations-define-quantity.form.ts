import { inject } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { Preparation } from "../models/preparation";
import { RawMaterialsMeasurementUnit } from "../../raw-materials/enums/raw-materials-measurement-unit";

export const createPreparationsDefineQuantityForm = (preparation: Preparation) => {
	return inject(NonNullableFormBuilder).group({
		measurementUnit: [RawMaterialsMeasurementUnit.KILOGRAMS as RawMaterialsMeasurementUnit],
		quantity: [preparation?.quantity ?? 0, Validators.required],
	});
}

export type PreparationsDefineQuantityForm = ReturnType<typeof createPreparationsDefineQuantityForm>;
export type PreparationsDefineQuantityPayload = ReturnType<PreparationsDefineQuantityForm["getRawValue"]>;
