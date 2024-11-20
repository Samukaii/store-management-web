import { Identifiable } from "../../../shared/models/identifiable";
import { FoodInputMeasurementUnit } from "../enums/food-input-measurement-unit";

export interface FoodInput extends Identifiable {
	name: string;
	costPerUnit: number;
	cost: number;
	quantity: number;
	measurementUnit: {
		id: FoodInputMeasurementUnit;
		name: string;
	};
}
