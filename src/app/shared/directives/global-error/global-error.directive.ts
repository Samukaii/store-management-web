import { computed, Directive, effect, ElementRef, inject, input, OnDestroy } from '@angular/core';
import { ErrorsService } from "src/app/core/error-handling/errors.service";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { Generic } from "src/app/shared/models/generic";

@Directive({
	selector: '[appGlobalError]'
})
export class GlobalErrorDirective implements OnDestroy {
	private errorsService = inject(ErrorsService);
	private elementRef = inject(ElementRef);
	control = input.required<FormControl>();
	controlName = computed(() => this.getControlName(this.control()));

	private subscription?: Subscription;

	private watchGlobalError = effect(() => {
		this.subscription?.unsubscribe();

		const name = this.controlName();

		this.subscription = this.errorsService.watchFieldError(name).subscribe(error => {
			if(!error) return;

			this.applyError(error);
		});
	});

	private getControlName(control: FormControl) {
		const parent = control.parent;

		if (!parent)
			throw new Error("The control must have a parent. Make sure it is inside a FormGroup");

		const controls = parent.controls as Generic;

		return Object.keys(controls).find(name => control === controls[name])!;
	}

	private applyError(error: string) {
		const element = this.elementRef.nativeElement as HTMLElement;

		element.scrollIntoView({ behavior: "smooth", block: "center" });

		this.control().setErrors({
			customError: error
		});
	}

	ngOnDestroy() {
		this.subscription?.unsubscribe();
		this.errorsService.clearFieldError(this.controlName());
	}
}
