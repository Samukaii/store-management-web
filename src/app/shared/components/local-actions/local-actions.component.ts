import { Component, computed, inject, input } from '@angular/core';
import { LocalActionsService } from "./local-actions.service";
import { ButtonsListComponent } from "../buttons-list/buttons-list.component";

@Component({
    selector: 'app-local-actions',
	imports: [
		ButtonsListComponent
	],
    templateUrl: './local-actions.component.html',
    styleUrl: './local-actions.component.scss',
	host: {
		'[style.padding]': 'actions()().length ? ".5rem 1rem": "0"'
	}
})
export class LocalActionsComponent {
	where = input.required<string>();

	private service = inject(LocalActionsService);

	actions = computed(() => this.service.getActions(this.where()));
}
