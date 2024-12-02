import { Directive, inject, input, OnChanges, OnDestroy, OnInit, output, signal, SimpleChanges } from '@angular/core';
import { ButtonRequestLoadingService } from "./button-request-loading.service";
import { v4 as uuidv4 } from 'uuid';
import { ButtonLoadingFinishStatus } from "./models/button-loading-finish.status";

@Directive({
	selector: '[appButtonExtended]',
	host: {
		'(click)': 'onButtonClick()'
	}
})
export class ButtonRequestLoadingDirective implements OnChanges, OnInit, OnDestroy {
	private service = inject(ButtonRequestLoadingService);

	finishLoading = output<ButtonLoadingFinishStatus>();

	identifier = input<string>(uuidv4());

	loading = signal(false);

	ngOnInit() {
		this.service.registerButton(this.identifier(), this);
	}


	ngOnChanges(changes: SimpleChanges) {
		const change = changes['identifier'];

		if(change) {
			this.service.unregisterButton(change.previousValue);
			this.service.registerButton(change.currentValue, this);
		}
	}

	onButtonClick() {
		this.service.setLastClickedButton(this.identifier());
	}

	startRequestLoading() {
		this.loading.set(true);
	}

	finalizeLoading(status: 'success' | 'error' | 'no-request') {
		this.loading.set(false);

		this.finishLoading.emit(status);
	}

	ngOnDestroy() {
		this.service.unregisterButton(this.identifier());
	}
}
