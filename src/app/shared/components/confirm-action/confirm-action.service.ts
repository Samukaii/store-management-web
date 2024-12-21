import { inject, Injectable } from '@angular/core';
import { DialogService } from "../../services/dialog/dialog.service";
import { ConfirmActionComponent } from "./confirm-action.component";
import { ConfirmActionOptions } from "./models/confirm-action-options";
import { DynamicForm } from "../dynamic-form/models/dynamic-form-control";

@Injectable({
  providedIn: 'root'
})
export class ConfirmActionService {
	private dialog = inject(DialogService);

	confirm<Form extends DynamicForm>(options: ConfirmActionOptions<Form>) {
		this.dialog.open({
			component: ConfirmActionComponent,
			data: options,
			config: {
				width: "fit-content",
				minWidth: "500px",
				...options.config
			}
		})
	}
}
