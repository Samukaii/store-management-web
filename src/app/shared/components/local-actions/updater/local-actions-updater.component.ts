import { Component, effect, inject, input, OnDestroy } from '@angular/core';
import { Button } from "../../button/models/button";
import { LocalActionsService } from "../local-actions.service";

@Component({
	selector: 'app-local-actions-updater',
	standalone: true,
	template: '',
	styles: ''
})
export class LocalActionsUpdaterComponent implements OnDestroy {
	where = input.required<string>();
	actions = input.required<Button[]>();

	private service = inject(LocalActionsService);

	private updateActions = effect(() => {
		this.service.updateActions(this.where(), this.actions())
	});

	ngOnDestroy() {
		this.service.deleteActions(this.where());
	}
}
