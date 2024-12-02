import { Component, input } from '@angular/core';
import { MatProgressSpinner, ProgressSpinnerMode } from "@angular/material/progress-spinner";

@Component({
    selector: 'app-progress-spinner',
    imports: [
        MatProgressSpinner
    ],
    templateUrl: './progress-spinner.component.html',
    styleUrl: './progress-spinner.component.scss'
})
export class ProgressSpinnerComponent {
	mode = input<ProgressSpinnerMode>('indeterminate');
	strokeWidth = input(4);
	diameter = input(40);
	text = input<string>();
}
