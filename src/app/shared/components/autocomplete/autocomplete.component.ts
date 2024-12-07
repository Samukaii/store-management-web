import { Component, DestroyRef, inject, input, OnInit, output, signal } from '@angular/core';
import {
	MatAutocomplete,
	MatAutocompleteSelectedEvent,
	MatAutocompleteTrigger,
	MatOption
} from "@angular/material/autocomplete";
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatError, MatFormField, MatInput, MatLabel } from "@angular/material/input";
import { rxResource, takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AutocompleteMethod } from "./models/autocomplete-method";
import { AutocompleteOption } from "./models/autocomplete-option";
import { map, of, startWith } from "rxjs";
import { toNumberOrNull } from "../../helpers/to-number-or-null";
import { ProgressSpinnerComponent } from "../../../core/components/progress-spinner/progress-spinner.component";
import { FieldErrorComponent } from "../field-error/field-error.component";

@Component({
    selector: 'app-autocomplete',
	imports: [
		MatAutocomplete,
		MatOption,
		ReactiveFormsModule,
		MatAutocompleteTrigger,
		MatInput,
		MatLabel,
		MatFormField,
		ProgressSpinnerComponent,
		MatError,
		FieldErrorComponent
	],
    templateUrl: './autocomplete.component.html',
    styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent implements OnInit {
	control = input.required<FormControl>();
	method = input.required<AutocompleteMethod>();
	label = input("");
	placeholder = input("");
	select = output<AutocompleteOption>();

	destroyRef = inject(DestroyRef);

	internalForm = inject(NonNullableFormBuilder).group({
		search: [""]
	});

	search = signal("");
	preventEmission = false;

	filteredData = rxResource({
		request: this.search,
		loader: ({request: nameSearch}) => {

			if (nameSearch)
				return this.method()({'name:search': nameSearch});

			return this.method()({});
		}
	});

	onSelect($event: MatAutocompleteSelectedEvent) {
		const value = $event.option.value as AutocompleteOption;

		if (!value) return;

		this.control().setValue(value.id);
		this.internalForm.controls.search.setValue(value.name, {emitEvent: false});

		this.select.emit(value);
	}

	ngOnInit() {
		this.syncErrors();
		this.watchControl();
		this.watchSearch();
	}

	private watchControl() {
		const search = this.internalForm.controls.search;

		const controlChanges$ = this.control().valueChanges.pipe(takeUntilDestroyed(this.destroyRef));

		controlChanges$.subscribe(value => {
			const id = toNumberOrNull(value);

			if(id !== null) {
				this.searchId(id).subscribe(result => {
					search.setValue(result?.name ?? "", {emitEvent: false});
				});

				return;
			}

			search.setValue(value, {emitEvent: false});
		});
	}

	private syncErrors() {
		const search = this.internalForm.controls.search;

		const controlError = this.getControlError$();

		controlError.subscribe(error => {
			search.setValidators(() => error);
			this.preventEmission = true;
			search.updateValueAndValidity();
		});
	}

	private getControlError$() {
		return this.control().statusChanges.pipe(
			map(() => this.control().errors),
			startWith(this.control().errors),
			takeUntilDestroyed(this.destroyRef)
		)
	}

	private searchId(id: number) {
		const foundOption = this.filteredData.value()?.find(option => option.id === id);

		if (foundOption) return of(foundOption);

		return this.method()({'id:equal': id}).pipe(
			map(items => items.at(0)),
			takeUntilDestroyed(this.destroyRef)
		)
	}

	private watchSearch() {
		const search = this.internalForm.controls.search;

		const changes$ = search.valueChanges.pipe(takeUntilDestroyed(this.destroyRef));

		changes$.subscribe(value => {
			if (this.preventEmission) {
				this.preventEmission = false;
				return;
			}

			this.search.set(value);
		});
	}
}
