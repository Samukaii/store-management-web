import { Component, input } from '@angular/core';
import { ProgressSpinnerComponent } from "../progress-spinner/progress-spinner.component";

@Component({
    selector: 'app-window-loading',
    imports: [
        ProgressSpinnerComponent
    ],
    templateUrl: './window-loading.component.html',
    styleUrl: './window-loading.component.scss'
})
export class WindowLoadingComponent {
	loading = input(false);
	strokeWidth = input(4);
	diameter = input(40);
}
