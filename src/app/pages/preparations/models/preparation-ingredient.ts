import { Identifiable } from "../../../shared/models/identifiable";

export interface PreparationIngredient extends Identifiable {
	name: string;
	totalCost: number;
	quantity: number;
	measurementUnit: {
		id: number;
		name: string;
	};
}
