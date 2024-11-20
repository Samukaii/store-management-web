import { Component, computed, inject, input } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { Button } from "../button/models/button";
import { LocalActionsService } from "./local-actions.service";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FlexRowComponent } from "../flex-row/flex-row.component";

@Component({
    selector: 'app-local-actions',
    imports: [
        ButtonComponent,
        RouterLink,
        FlexRowComponent
    ],
    templateUrl: './local-actions.component.html',
    styleUrl: './local-actions.component.scss'
})
export class LocalActionsComponent {
	where = input.required<string>();

	private service = inject(LocalActionsService);

	actions = computed(() => this.service.getActions(this.where()));

	onClick(action: Button) {
		action?.click?.();
	}
}
