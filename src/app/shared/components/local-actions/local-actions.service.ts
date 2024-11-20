import { computed, Injectable, signal } from '@angular/core';
import { Button } from "../button/models/button";

@Injectable({
	providedIn: 'root'
})
export class LocalActionsService {
	private actionsMap = signal<Record<string, Button[]>>({});

	updateActions(where: string, actions: Button[]) {
		this.actionsMap.update(map => {
			return {
				...map,
				[where]: actions
			};
		})
	}

	getActions(where: string) {
		return computed(() => this.actionsMap()[where] ?? [])
	}

	deleteActions(where: string) {
		this.actionsMap.update(map => {
			const copy = {...map};

			delete copy[where];

			return copy;
		})
	}
}
