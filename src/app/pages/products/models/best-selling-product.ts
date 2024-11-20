import { Product } from "./product";

export interface BestSellingProduct {
	product: Product;
	totalBilled: number;
	salesQuantity: number;
}
