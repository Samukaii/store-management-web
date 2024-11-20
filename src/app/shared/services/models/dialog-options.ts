import { Type } from "@angular/core";
import { ComponentDialogData } from "./component-dialog-data";
import { MatDialogConfig } from "@angular/material/dialog";

export interface DialogOptions<T, D> {
	component: Type<T>;
	data?: D;
	config?: Omit<MatDialogConfig<T>, "data">;
}
