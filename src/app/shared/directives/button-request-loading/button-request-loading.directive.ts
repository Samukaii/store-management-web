import { computed, Directive, effect, inject, input, OnDestroy, output, signal } from '@angular/core';
import { ButtonRequestLoadingService } from "./button-request-loading.service";
import { ButtonLoadingFinishStatus } from "./models/button-loading-finish.status";
import { UuidService } from "../../services/uuid/uuid.service";

@Directive({
	selector: '[appButtonRequestLoading]',
	host: {
		'(click)': 'onButtonClick()'
	}
})
export class ButtonRequestLoadingDirective implements OnDestroy {
	private service = inject(ButtonRequestLoadingService);
	private uuidService = inject(UuidService);
	private lastIdentifier?: string;
	internalLoading = signal(false);

	finishLoading = output<ButtonLoadingFinishStatus>();

	identifier = input<string>(this.uuidService.generate());
	loading = computed(() => this.internalLoading())

	updateButtonRegistration = effect(() => {
		const identifier = this.identifier();

		if(this.lastIdentifier) this.service.unregisterButton(this.lastIdentifier);

		this.lastIdentifier = identifier;
		this.service.registerButton(this.lastIdentifier, this);
	});

	startRequestLoading() {
		this.internalLoading.set(true);
	}

	async finalizeLoading(status: ButtonLoadingFinishStatus) {
		this.finishLoading.emit(status);

		setTimeout(() => this.internalLoading.set(false), 100);
	}

	protected onButtonClick() {
		this.service.setLastClickedButton(this.identifier());
	}

	ngOnDestroy() {
		this.service.unregisterButton(this.identifier());
	}
}
