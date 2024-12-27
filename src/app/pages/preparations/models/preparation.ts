import { Identifiable } from "src/app/shared/models/identifiable";

export interface Preparation extends Identifiable {
	measurementUnit: {
		id: number;
		name: string;
	};
	name: string;
	totalCost: number;
	costPerUnit: number;
	quantity: number;
}
