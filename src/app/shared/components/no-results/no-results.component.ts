import { Component, input } from '@angular/core';
import { MatIcon } from "@angular/material/icon";

@Component({
    selector: 'app-no-results',
    imports: [
        MatIcon
    ],
    templateUrl: './no-results.component.html',
    styleUrl: './no-results.component.scss'
})
export class NoResultsComponent {
	icon = input.required<string>();
	label = input.required<string>();
	description = input<string>();
}
