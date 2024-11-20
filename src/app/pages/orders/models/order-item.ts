import { Identifiable } from "../../../shared/models/identifiable";

export interface OrderItem extends Identifiable {
	name: string;
	quantity: number;
	total: number;
}
