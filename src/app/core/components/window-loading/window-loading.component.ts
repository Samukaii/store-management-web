import { booleanAttribute, Component, computed, effect, inject, input } from '@angular/core';
import { ProgressSpinnerComponent } from "../progress-spinner/progress-spinner.component";
import { TopBarLoadingService } from "../top-bar/top-bar-loading.service";

@Component({
    selector: 'app-window-loading',
	imports: [
		ProgressSpinnerComponent
	],
    templateUrl: './window-loading.component.html',
    styleUrl: './window-loading.component.scss'
})
export class WindowLoadingComponent {
	private service = inject(TopBarLoadingService);

	loading = input(false);
	noPreservation = input(false, {transform: booleanAttribute});
	strokeWidth = input(4);
	diameter = input(40);

	firstLoad = true;

	updateTopBarLoading = effect(() => {
		this.service.setLoading(this.loadingMode() === "preservation");
	});

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
