import { Component, computed, inject, input, OnInit, signal, ViewContainerRef } from '@angular/core';
import { FormControl } from "@angular/forms";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
	selector: 'app-field-error',
	templateUrl: 'field-error.component.html',
	styleUrls: ['./form.component.scss']
})
export class FieldErrorComponent implements OnInit {
	control = input.required<FormControl>();

	invalid = signal(false);

	untilDestroyed = takeUntilDestroyed();

	container = inject(ViewContainerRef);

	error = computed(() => {
		const invalid = this.invalid();

		if(!invalid) return '';

		const errors = this.control().errors;

		if (!errors) return null;

		if (errors['required']) return "Campo obrigatório";

		if (errors['customError']) return errors['customError'] as string;

		return '';
	});

	ngOnInit() {
		this.invalid.set(this.control().status === "INVALID");

		this.control().statusChanges.pipe(this.untilDestroyed).subscribe(status => {
			this.invalid.set(status === "INVALID");
		})
	}
}
