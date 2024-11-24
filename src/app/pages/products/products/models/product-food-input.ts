import { Identifiable } from "../../../../shared/models/identifiable";
import { RawMaterial } from "../../../raw-materials/models/raw-material";
import { Preparation } from "../../../preparations/models/preparation";

export interface ProductFoodInput extends Identifiable {
	preparation?: Preparation;
	totalCost: number;
	quantity: number;
	measurementUnit: {
		id: number;
		name: string;
	};
	rawMaterial?: RawMaterial;
}
