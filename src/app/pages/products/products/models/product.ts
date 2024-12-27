import { Identifiable } from "src/app/shared/models/identifiable";

export interface Product extends Identifiable {
	name: string;
	price: number;
	totalCost: number;
	suggestedPrice: number;
	profitMargin: number;
	profit: number;
	category: {
		id: number;
		name: string;
	}
}
