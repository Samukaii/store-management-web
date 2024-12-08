import {
	ChangeDetectorRef,
	ComponentRef,
	Directive,
	effect,
	inject,
	input,
	Renderer2,
	ViewContainerRef
} from '@angular/core';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatButton, MatIconButton } from "@angular/material/button";
import { AppColor } from "../../components/button/models/app-color";

@Directive({
	selector: '[appButtonLoading]',
})
export class ButtonLoadingDirective {
	private matButton = inject(MatButton, {optional: true});
	private matIconButton = inject(MatIconButton, {optional: true});
	private viewContainerRef = inject(ViewContainerRef);
	private renderer = inject(Renderer2);
	private spinner?: ComponentRef<MatProgressSpinner> | null;
	private detector = inject(ChangeDetectorRef);

	loading = input(false);

	get buttonElement() {
		const button = this.matButton ?? this.matIconButton;

		return button?._elementRef.nativeElement as HTMLElement | undefined;
	}

	get color() {
		const button = this.matButton ?? this.matIconButton;

		return button?.color as AppColor;
	}

	changeSpinner = effect(() => {
		if (this.loading()) this.createSpinner();
		else this.destroySpinner();
	});

	private createSpinner(): void {
		if (this.spinner) return;

		if (this.matButton)
			this.matButton.disabled = true;

		if (!this.buttonElement) return;

		this.renderer.addClass(this.buttonElement, 'mat-loading');
		this.renderer.addClass(this.buttonElement, `color-${this.color}`);
		this.renderer.setStyle(this.buttonElement, 'pointer-events', 'none');

		this.spinner = this.viewContainerRef.createComponent(MatProgressSpinner);
		this.spinner.setInput('diameter', 20);
		this.spinner.setInput('mode', 'indeterminate');


		this.renderer.appendChild(this.buttonElement, this.spinner.instance._elementRef.nativeElement);
	}

	private destroySpinner(): void {
		if (!this.spinner) return;

		this.renderer.removeClass(this.buttonElement, 'mat-loading');
		this.renderer.removeClass(this.buttonElement, `color-${this.color}`);
		this.renderer.setStyle(this.buttonElement, 'pointer-events', 'auto');

		if (this.matButton)
			this.matButton.disabled = false;

		this.spinner?.destroy?.();
		this.spinner = null;
	}
}
