import { computed, DestroyRef, Directive, effect, ElementRef, inject, input, OnDestroy, OnInit } from '@angular/core';
import { ErrorsService } from "../../../core/error-handling/errors.service";
import { AbstractControl, FormControl } from "@angular/forms";
import { isObjectLiteral } from "../../helpers/is-object-literal";
import { Subscription } from "rxjs";

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

		if (!name) return;

		this.subscription = this.errorsService.watchFieldError(name).subscribe(error => {
			if(!error) return;

			this.applyError(error);
		});
	});

	private getControlName(control: FormControl) {
		const controls = control.parent?.controls;

		if (!isObjectLiteral(controls)) return;

		return Object.keys(controls).find(name => control === controls[name]);
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
		this.errorsService.clearFieldError(this.controlName() ?? "");
	}
}
