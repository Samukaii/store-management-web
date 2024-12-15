import { inject, Injectable } from '@angular/core';
import { DialogService } from "../../services/dialog.service";
import { ConfirmActionComponent } from "./confirm-action.component";
import { ConfirmActionOptions } from "./models/confirm-action-options";

@Injectable({
  providedIn: 'root'
})
export class ConfirmActionService {
	private dialog = inject(DialogService);

	confirm(options: ConfirmActionOptions) {
		this.dialog.open({
			component: ConfirmActionComponent,
			data: options,
			config: {
				minWidth: "fit-content",
			}
		})
	}
}
