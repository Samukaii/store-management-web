import { Component, computed, DestroyRef, effect, inject, input, OnInit, output, signal } from '@angular/core';
import {
	FormControlStatus,
	FormGroup, PristineChangeEvent,
	ReactiveFormsModule,
	StatusChangeEvent, TouchedChangeEvent,
	Validators,
	ValueChangeEvent
} from "@angular/forms";
import { FormHelper } from "../../../helpers/form-helper/form-helper";
import { Generic } from "../../../models/generic";
import { FormModifier } from "../../../models/form-modifier";
import { FormValidation } from "../../../models/form-validation";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormValue } from "../../../models/form-value";
import { ButtonComponent } from "../../button/button.component";
import { FlexRowComponent } from "../../flex-row/flex-row.component";
import { Button } from "../../button/models/button";
import { tap } from "rxjs";

@Component({
	selector: 'app-form',
	imports: [
		ReactiveFormsModule,
		ButtonComponent,
		FlexRowComponent
	],
	templateUrl: './form.component.html',
	styleUrl: './form.component.scss'
})
export class FormComponent<Data extends Generic, Form extends FormGroup<any>> implements OnInit {
	form = input.required<Form>();
	data = input<Data>();
	primaryActionFromInput = input<Partial<Button>>({}, {
		alias: 'primaryAction',
	});
	modifiers = input<FormModifier<Form, Data>[]>([]);
	validations = input<FormValidation<Form>[]>([]);
	formSubmit = output<FormValue<Form>>();

	formValue = signal<FormValue<Form> | null>(null);
	formStatus = signal<FormControlStatus>('VALID');
	formPristine = signal(false);
	shouldDisable = computed(() => this.formStatus() === 'INVALID' || this.formPristine());

	destroyRef = inject(DestroyRef);

	primaryAction = computed(() => {
		return {
			label: "Salvar",
			type: "flat",
			disabled: this.shouldDisable(),
			...this.primaryActionFromInput(),
		} as Button;
	})

	ngOnInit() {
		this.formValue.set(this.form().getRawValue());
		this.formStatus.set(this.form().status);
		this.formPristine.set(this.form().pristine);

		this.form().events
			.pipe(takeUntilDestroyed(this.destroyRef),
				tap(event => {
					if(event instanceof ValueChangeEvent)
						this.formValue.set(this.form().getRawValue());

					if(event instanceof StatusChangeEvent)
						this.formStatus.set(this.form().status);

					if(event instanceof PristineChangeEvent)
						this.formPristine.set(this.form().pristine);
				})
			)
			.subscribe();
	}

	updateForm = effect(() => {
		const data = this.data();

		if (!data) return;

		FormHelper.patchForm(this.form(), data, this.modifiers())
	});

	updateFormValidators = effect(() => {
		const formValue = this.formValue();

		if (!formValue) return;

		const validations = this.validations();

		validations.forEach(validation => {
			const control = this.form().get(validation.key);

			if (!control) return;

			const validator = validation.validator === "required"
				? Validators.required : validation.validator;

			if (validation.enabled(formValue)) {
				if (!control.hasValidator(validator)) {
					control.addValidators(validator);
					control.updateValueAndValidity();
				}
			} else {
				if (control.hasValidator(validator)) {
					control.removeValidators(validator);
					control.updateValueAndValidity();
				}
			}

		})
	})

	onSubmit() {
		if (this.form().invalid) return;

		this.formSubmit.emit(this.form().getRawValue());
	}

	onPrimaryClick() {
		this.onSubmit();
		this.primaryAction()?.click?.();
	}
}
