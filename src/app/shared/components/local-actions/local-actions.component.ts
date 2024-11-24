import { Component, computed, inject, input } from '@angular/core';
import { LocalActionsService } from "./local-actions.service";
import { ButtonsListComponent } from "../buttons-list/buttons-list.component";

@Component({
    selector: 'app-local-actions',
	imports: [
		ButtonsListComponent
	],
    templateUrl: './local-actions.component.html',
    styleUrl: './local-actions.component.scss'
})
export class LocalActionsComponent {
	where = input.required<string>();

	private service = inject(LocalActionsService);

	actions = computed(() => this.service.getActions(this.where()));
}
