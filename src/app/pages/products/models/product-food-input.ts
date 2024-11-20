import { FoodInput } from "../../food-inputs/models/food-input";
import { Identifiable } from "../../../shared/models/identifiable";

export interface ProductFoodInput extends Identifiable {
	totalCost: number;
	quantity: number;
	measurementUnit: {
		id: number;
		name: string;
	};
	foodInput: FoodInput;
}
