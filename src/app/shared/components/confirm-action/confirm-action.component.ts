import { Component, computed, inject, input } from '@angular/core';
import { ButtonsListComponent } from "../../../shared/components/buttons-list/buttons-list.component";
import { Button } from "../../../shared/components/button/models/button";
import { DialogService } from "../../../shared/services/dialog.service";

@Component({
  selector: 'app-confirm-action',
	imports: [
		ButtonsListComponent
	],
  templateUrl: './confirm-action.component.html',
  styleUrl: './confirm-action.component.scss'
})
export class ConfirmActionComponent {
	title = input<string>("");
	description = input<string>();
	actions = input<{primary?: Partial<Button>; secondary?: Partial<Button>}>();

	dialog = inject(DialogService);

	secondaryAction = computed(() => this.actions()?.secondary ?? {});
	primaryAction = computed(() => this.actions()?.primary ?? {});

	actionsList: Button[] = [
		{
			type: "stroked",
			label: "Voltar",
			...this.secondaryAction(),
			click: () => {
				this.secondaryAction().click?.();
				this.dialog.close(ConfirmActionComponent);
			}
		},
		{
			type: "flat",
			label: "Confirmar",
			afterLoadingSuccess: () => this.dialog.close(ConfirmActionComponent),
			...this.primaryAction(),
			click: () => {
				this.primaryAction().click?.();
			}
		},
	];
}
