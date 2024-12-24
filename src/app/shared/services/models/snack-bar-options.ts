import { MatSnackBarConfig } from "@angular/material/snack-bar";

export interface SnackBarOptions {
	message: string;
	level: "success" | "error";
	action?: string;
	config?: MatSnackBarConfig;
}
