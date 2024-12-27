import { Component, computed, DestroyRef, effect, inject, input, OnInit, output, signal } from '@angular/core';
import {
	MatAutocomplete,
	MatAutocompleteSelectedEvent,
	MatAutocompleteTrigger,
	MatOption
} from "@angular/material/autocomplete";
import { FormBuilder, FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatError, MatFormField, MatInput, MatLabel } from "@angular/material/input";
import { rxResource, takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AutocompleteMethod } from "./models/autocomplete-method";
import { AutocompleteOption } from "./models/autocomplete-option";
import { map, of, startWith } from "rxjs";
import { FieldErrorComponent } from "../field-error/field-error.component";
import { toIdentifiable } from "../../helpers/to-identifiable/to-identifiable";
import { ButtonComponent } from "../button/button.component";
import { NoResultsAction } from "./models/no-results-action";
import { NoResultsActionsFn } from "./models/no-results-actions-fn";
import { GlobalErrorDirective } from "../../directives/global-error/global-error.directive";
import { ProgressSpinnerComponent } from "../progress-spinner/progress-spinner.component";


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
		FieldErrorComponent,
		ButtonComponent
	],
    templateUrl: './autocomplete.component.html',
    styleUrl: './autocomplete.component.scss',
	hostDirectives: [{
		directive: GlobalErrorDirective,
		inputs: ["control"]
	}]
})
export class AutocompleteComponent implements OnInit {
	control = input.required<FormControl>();
	method = input.required<AutocompleteMethod>();
	label = input("");
	key = input("id");
	placeholder = input("");
	noResults = input<NoResultsAction | NoResultsActionsFn>({
		message: "Nenhum resultado encontrado",
	});
	select = output<AutocompleteOption>();

	destroyRef = inject(DestroyRef);

	internalForm = inject(FormBuilder).group({
		search: [""]
	});

	search = signal("");
	preventEmission = false;
	searching = signal(false);

	selectedId?: number | string;

	stopSearching = effect(() => {
		if (this.search().length) return;

		this.searching.set(false);

		this.internalForm.controls.search.setValidators(() => this.control().errors);
		this.preventEmission = true;
		this.internalForm.controls.search.updateValueAndValidity();
	})

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

		this.selectedId = value.id;

		this.searching.set(false);
		this.control().setValue(value.id);
		this.control().markAsDirty();

		this.internalForm.controls.search.setValue(value.name, {emitEvent: false});

		this.select.emit(value);
	}

	ngOnInit() {
		this.syncErrors();
		this.watchControl();
		this.watchSearch();
	}

	noResultsValue = computed(() => {
		const searchValue = this.search();
		const control = this.control();
		const noResults = this.noResults();

		if(typeof noResults === "function")
			return noResults({
				searchValue,
				control,
				reload: () => {
					this.filteredData.reload();
				}
			});

		return noResults;
	});

	private watchControl() {
		const search = this.internalForm.controls.search;

		const controlChanges$ = this.control().valueChanges.pipe(
			startWith(this.control().value),
			takeUntilDestroyed(this.destroyRef)
		);

		controlChanges$.subscribe(value => {
			const id = toIdentifiable(value);

			if(id !== null && id !== this.selectedId) {
				this.searchId(id).subscribe(result => {
					search.setValue(result?.name ?? "", {emitEvent: false});
				});

				return;
			}

			if (!this.searching()) search.setValue(value, {emitEvent: false});
		});
	}

	private syncErrors() {
		const search = this.internalForm.controls.search;

		const controlError = this.getControlError$();

		controlError.subscribe(error => {
			if (this.searching() && this.search().length) {
				search.setValidators(() => null);
				this.preventEmission = true;
				search.updateValueAndValidity();

				return;
			}

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

	private searchId(id: number | string) {
		const foundOption = this.filteredData.value()?.find(option => option.id === id);

		if (foundOption) return of(foundOption);

		return this.method()({[`${this.key()}:equal`]: id}).pipe(
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

			if(typeof value !== 'string') return;

			this.searching.set(true);
			this.control().setValue(null);

			this.search.set(value);
		});
	}

	noResultsClick() {
		this.noResultsValue().action?.();
	}
}
