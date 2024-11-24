import { Identifiable } from "../../../shared/models/identifiable";
import { RawMaterialsMeasurementUnit } from "../enums/raw-materials-measurement-unit";

export interface RawMaterial extends Identifiable {
	name: string;
	costPerUnit: number;
	cost: number;
	quantity: number;
	measurementUnit: {
		id: RawMaterialsMeasurementUnit;
		name: string;
	};
}