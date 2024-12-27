import { Identifiable } from "../src/app/shared/models/identifiable";

export interface ProductFoodInput extends Identifiable {
	totalCost: number;
	quantity: number;
	name: string;
	measurementUnit: {
		id: number;
		name: string;
	};
}
