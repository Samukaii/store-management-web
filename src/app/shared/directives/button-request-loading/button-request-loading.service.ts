import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpRequest, HttpResponse } from "@angular/common/http";
import { ButtonRequestLoadingDirective } from "./button-request-loading.directive";
import { removeUrlParameters } from "../../helpers/remove-url-parameters";
import { ButtonLoadingFinishStatus } from "./models/button-loading-finish.status";

@Injectable({
	providedIn: 'root'
})
export class ButtonRequestLoadingService {
	private lastClickedButtonIdentifier: string | null = null;
	private allButtons = new Map<string, ButtonRequestLoadingDirective>();
	private currentButtonsRequesting = new Map<string, ButtonRequestLoadingDirective>();

	getButton(identifier: string) {
		return this.allButtons.get(identifier);
	}

	registerButton(identifier: string, button: ButtonRequestLoadingDirective): void {
		this.allButtons.set(identifier, button);
	}

	unregisterButton(identifier: string): void {
		this.allButtons.delete(identifier);
	}

	setLastClickedButton(id: string): void {
		this.lastClickedButtonIdentifier = id;
	}

	removeLastClickedButton(): void {
		this.lastClickedButtonIdentifier = null;
	}

	addLoading(httpRequest: HttpRequest<unknown>): void {
		const url = removeUrlParameters(httpRequest.url);

		if (this.lastClickedButtonIdentifier) {
			const button = this.getButton(this.lastClickedButtonIdentifier);
			if (!button) return;

			button.startRequestLoading();

			this.currentButtonsRequesting.set(url, button);
		}
	}

	finishLoading(response: HttpResponse<any> | HttpErrorResponse) {
		const url = removeUrlParameters(response.url ?? '');

		const formButtonLoadingFromRequest =
			this.currentButtonsRequesting.get(url)

		if(formButtonLoadingFromRequest) {
			const status: ButtonLoadingFinishStatus = response.ok ? 'success' : 'error';
			formButtonLoadingFromRequest.finalizeLoading(status);

			this.currentButtonsRequesting.delete(url);
		}
	}
}