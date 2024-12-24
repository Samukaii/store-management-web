import {
	computed,
	Directive,
	inject,
	input,
	OnChanges,
	OnDestroy,
	OnInit,
	output,
	signal,
	SimpleChanges
} from '@angular/core';
import { ButtonRequestLoadingService } from "./button-request-loading.service";
import { ButtonLoadingFinishStatus } from "./models/button-loading-finish.status";
import { UuidService } from "../../services/uuid/uuid.service";

@Directive({
	selector: '[appButtonRequestLoading]',
	host: {
		'(click)': 'onButtonClick()'
	}
})
export class ButtonRequestLoadingDirective implements OnChanges, OnInit, OnDestroy {
	private service = inject(ButtonRequestLoadingService);
	private uuidService = inject(UuidService);
	internalLoading = signal(false);

	finishLoading = output<ButtonLoadingFinishStatus>();

	identifier = input<string>(this.uuidService.generate());
	loading = computed(() => this.internalLoading())

	ngOnInit() {
		this.service.registerButton(this.identifier(), this);
	}

	ngOnChanges(changes: SimpleChanges) {
		const change = changes['identifier'];

		if(change) {
			if (change.previousValue) this.service.unregisterButton(change.previousValue);
			this.service.registerButton(change.currentValue, this);
		}
	}

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
