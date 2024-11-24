import { Identifiable } from "../../../shared/models/identifiable";

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
