import { Component, input } from '@angular/core';
import { FlexAlignment } from "../flex-row/models/flex-alignment";
import { Button } from "../button/models/button";
import { FlexRowComponent } from "../flex-row/flex-row.component";
import { ButtonComponent } from "../button/button.component";
import { RouterLink } from "@angular/router";

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
	alignment = input<FlexAlignment>("flex-start");
	actions = input.required<Button[]>();

	onClick(action: Button) {
		action?.click?.();
	}
}
