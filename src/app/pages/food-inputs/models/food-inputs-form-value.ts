import { createFoodInputsForm } from "../form/food-inputs-form";
import { FoodInputsForm } from "./food-inputs-form";

export type FoodInputsFormValue = ReturnType<FoodInputsForm["getRawValue"]>;
