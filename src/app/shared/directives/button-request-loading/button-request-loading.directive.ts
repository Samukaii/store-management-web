import { Directive, inject, input, OnChanges, OnDestroy, OnInit, output, signal, SimpleChanges } from '@angular/core';
import { ButtonRequestLoadingService } from "./button-request-loading.service";
import { v4 as uuidv4 } from 'uuid';
import { ButtonLoadingFinishStatus } from "./models/button-loading-finish.status";
import { wait } from "../../helpers/wait";

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

	async finalizeLoading(status: 'success' | 'error' | 'no-request') {
		this.finishLoading.emit(status);

		await wait(100);

		this.loading.set(false);
	}

	ngOnDestroy() {
		this.service.unregisterButton(this.identifier());
	}
}
