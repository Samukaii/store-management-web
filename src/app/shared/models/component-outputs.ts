import { ComponentOutputNames } from "./component-output-names";
import { OutputEmitterRef } from "@angular/core";
import { ProductsFormComponent } from "../../pages/products/form/products-form.component";
import { ComponentDialogData } from "../services/models/component-dialog-data";
import {
	ProductsIngredientsCreatorComponent
} from "../../pages/products/ingredients/creator/products-ingredients-creator.component";

export type ComponentOutputs<T> = {
	[Key in ComponentOutputNames<T>]: T[Key] extends OutputEmitterRef<infer OutputValue>
		? (value: OutputValue) => void
		: never;
}
