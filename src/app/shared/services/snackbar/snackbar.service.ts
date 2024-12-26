import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarOptions } from "src/app/shared/services/models/snack-bar-options";

@Injectable({
	providedIn: 'root'
})
export class SnackbarService {
	private snackbar = inject(MatSnackBar);

	open(options: SnackBarOptions) {
		this.snackbar.open(options.message, options.action ?? "Fechar", {
			panelClass: `snackbar-${options.level}`,
			duration: 5000,
			...options.config
		})
	}
}
