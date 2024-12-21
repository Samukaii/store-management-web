import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

interface SnackBarOptions {
	message: string;
	level: "success" | "error";
	action?: string;
	config?: MatSnackBarConfig;
}

@Injectable({
	providedIn: 'root'
})
export class SnackbarService {
	private snackbar = inject(MatSnackBar);

	open(options: SnackBarOptions) {
		this.snackbar.open(options.message, "Fechar", {
			panelClass: `snackbar-${options.level}`,
			duration: 5000,
			...options.config
		})
	}
}
