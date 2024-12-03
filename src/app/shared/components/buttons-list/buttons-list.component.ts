import { Component, input } from '@angular/core';
import { FlexAlignment } from "../flex-row/models/flex-alignment";
import { Button } from "../button/models/button";
import { FlexRowComponent } from "../flex-row/flex-row.component";
import { RouterLink } from "@angular/router";
import { ButtonLoadingFinishStatus } from "../../directives/button-request-loading/models/button-loading-finish.status";
import { ButtonComponent } from '../button/button.component';

@Component({
    selector: 'app-buttons-list',
	imports: [
		FlexRowComponent,
		ButtonComponent,
		RouterLink
	],
    templateUrl: './buttons-list.component.html',
    styleUrl: './buttons-list.component.scss'
})
export class ButtonsListComponent {
	gap = input<string>("1rem");
	alignment = input<FlexAlignment>("flex-start");
	actions = input.required<Button[]>();

	onClick(action: Button) {
		action?.click?.();
	}

	finishLoading(action: Button, status: ButtonLoadingFinishStatus) {
		if(status === 'success') action?.afterLoadingSuccess?.(status);
		if(status === 'no-request') action?.afterLoadingSuccess?.(status);
		if(status === 'error') action?.afterLoadingError?.();

		action?.afterLoading?.(status);
	}
}
