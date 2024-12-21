import { Component, computed, effect, inject, input } from '@angular/core';
import { ButtonsListComponent } from "../buttons-list/buttons-list.component";
import { Button } from "../button/models/button";
import { DialogService } from "../../services/dialog/dialog.service";
import { DynamicForm, DynamicFormControl, DynamicFormValue } from "../dynamic-form/models/dynamic-form-control";
import { FormBuilder } from "@angular/forms";
import { DynamicFormComponent } from "../dynamic-form/dynamic-form.component";
import { Generic } from "../../models/generic";
import { toSignal } from "@angular/core/rxjs-interop";


@Component({
	selector: 'app-confirm-action',
	imports: [
		ButtonsListComponent,
		DynamicFormComponent
	],
	templateUrl: './confirm-action.component.html',
	styleUrl: './confirm-action.component.scss'
})
export class ConfirmActionComponent<Form extends DynamicForm> {
	title = input<string>("");
	description = input<string>();
	actions = input<{
		primary?: Partial<Button<any[]>>;
		secondary?: Partial<Button<any[]>>
	}>();
	form = input<Form>();
	dynamicForm = inject(FormBuilder).group({});

	formStatus = toSignal(this.dynamicForm.statusChanges);

	dialog = inject(DialogService);

	secondaryAction = computed(() => this.actions()?.secondary ?? {});
	primaryAction = computed(() => this.actions()?.primary ?? {});

	actionsList = computed((): Button[] => [
		{
			type: "stroked",
			label: "Voltar",
			...this.secondaryAction(),
			click: () => {
				this.secondaryAction().click?.(this.dynamicForm.getRawValue());
				this.dialog.close(ConfirmActionComponent);
			}
		},
		{
			type: "flat",
			label: "Confirmar",
			afterLoadingSuccess: () => this.dialog.close(ConfirmActionComponent),
			disabled: this.formStatus() === "INVALID",
			...this.primaryAction(),
			click: () => {
				this.primaryAction().click?.(this.dynamicForm.getRawValue());
			}
		},
	]);
}
