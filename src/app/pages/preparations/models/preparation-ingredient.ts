import { Identifiable } from "../../../shared/models/identifiable";
import { RawMaterial } from "../../raw-materials/models/raw-material";

export interface PreparationIngredient extends Identifiable {
	totalCost: number;
	quantity: number;
	rawMaterial: RawMaterial;
}
