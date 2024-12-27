import { Identifiable } from "src/app/shared/models/identifiable";

export interface Order extends Identifiable {
	name: string;
	code: number;
	date: string;
	customerInfo: string;
	total: number;
	quantity: number;
}

