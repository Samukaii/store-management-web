import { Component, effect, inject, input, OnDestroy } from '@angular/core';
import { Button } from "../../button/models/button";
import { LocalActionsService } from "../local-actions.service";

@Component({
	selector: 'app-local-actions-updater',
	template: '',
	styles: ''
})
export class LocalActionsUpdaterComponent implements OnDestroy {
	where = input.required<string>();
	actions = input.required<Button[]>();

	private service = inject(LocalActionsService);
	private lastWhere?: string;

	private updateActions = effect(() => {
		if(this.lastWhere && this.lastWhere !== this.where())
			this.service.deleteActions(this.lastWhere);

		this.lastWhere = this.where();

		this.service.updateActions(this.where(), this.actions())
	});

	ngOnDestroy() {
		this.service.deleteActions(this.where());
	}
}
