import { Identifiable } from "../../../shared/models/identifiable";

export interface OrderItem extends Identifiable {
	name: string;
	integrationName: string;
	quantity: number;
	total: number;
}
