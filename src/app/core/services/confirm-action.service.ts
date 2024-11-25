import { inject, Injectable } from '@angular/core';
import { DialogService } from "../../shared/services/dialog.service";
import { ConfirmActionComponent } from "../components/confirm-action/confirm-action.component";
import { ConfirmActionOptions } from "../../shared/models/confirm-action-options";

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
