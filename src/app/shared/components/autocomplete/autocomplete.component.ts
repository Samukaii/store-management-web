import { Component, computed, DestroyRef, inject, input, OnInit, output } from '@angular/core';
import {
	MatAutocomplete,
	MatAutocompleteSelectedEvent,
	MatAutocompleteTrigger,
	MatOption
} from "@angular/material/autocomplete";
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatFormField, MatInput, MatLabel } from "@angular/material/input";
import { rxResource, takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { AutocompleteMethod } from "./models/autocomplete-method";
import { AutocompleteOption } from "./models/autocomplete-option";
import { map } from "rxjs";
import { toNumberOrNull } from "../../helpers/to-number-or-null";

@Component({
    selector: 'app-autocomplete',
    imports: [
        MatAutocomplete,
        MatOption,
        ReactiveFormsModule,
        MatAutocompleteTrigger,
        MatInput,
        MatLabel,
        MatFormField
    ],
    templateUrl: './autocomplete.component.html',
    styleUrl: './autocomplete.component.scss'
})
export class AutocompleteComponent implements OnInit {
	form = input.required<FormGroup>();
	name = input.required<string>();
	method = input.required<AutocompleteMethod>();
	label = input("");
	placeholder = input("");
	select = output<AutocompleteOption>();

	private destroyRef = inject(DestroyRef);

	control = computed(() => {
		return this.form().get(this.name()) as FormControl;
	});

	internalForm = inject(NonNullableFormBuilder).group({
		search: [""]
	});

	search = toSignal(this.internalForm.controls.search.valueChanges, {
		initialValue: ""
	});

	filteredData = rxResource({
		request: this.search,
		loader: ({request: nameSearch}) => this.method()({'name:search': nameSearch})
	});

	onSelect($event: MatAutocompleteSelectedEvent) {
		this.control().setValue($event.option.value.id);
		this.internalForm.controls.search.setValue($event.option.value.name);

		this.select.emit($event.option.value);
	}

	ngOnInit() {
		this.control().valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(value => {
			const id = toNumberOrNull(value);

			if(id !== null) {
				this.getValue(id).subscribe(result => {
					this.internalForm.controls.search.setValue(result?.name ?? "", {emitEvent: false});
				});

				return;
			}

			this.internalForm.controls.search.setValue(value, {emitEvent: false});
		})
	}

	getValue(id: number) {
		return this.method()({'id:equal': id}).pipe(map(items => items.at(0)))
	}
}
