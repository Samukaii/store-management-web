import { Identifiable } from "src/app/shared/models/identifiable";

export interface PreparationIngredient extends Identifiable {
	name: string;
	totalCost: number;
	quantity: number;
	measurementUnit: {
		id: number;
		name: string;
	};
}
