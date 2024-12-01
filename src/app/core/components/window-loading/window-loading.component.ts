import { booleanAttribute, Component, computed, input } from '@angular/core';
import { ProgressSpinnerComponent } from "../progress-spinner/progress-spinner.component";
import { MatProgressBar } from "@angular/material/progress-bar";

@Component({
    selector: 'app-window-loading',
	imports: [
		ProgressSpinnerComponent,
		MatProgressBar
	],
    templateUrl: './window-loading.component.html',
    styleUrl: './window-loading.component.scss'
})
export class WindowLoadingComponent {
	loading = input(false);
	noPreservation = input(false, {transform: booleanAttribute});
	strokeWidth = input(4);
	diameter = input(40);

	firstLoad = true;

	loadingMode = computed(() => {
		if(!this.loading()) return 'no-loading';

		if(this.firstLoad) {
			this.firstLoad = false;
			return 'no-preservation';
		}

		if(this.noPreservation()) return 'no-preservation';

		if(!this.firstLoad) return 'preservation';

		return 'no-preservation';
	})
}
