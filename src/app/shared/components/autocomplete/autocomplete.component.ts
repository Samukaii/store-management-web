import { afterRender, Component, computed, DestroyRef, effect, inject, input, OnInit } from '@angular/core';
import {
	MatAutocomplete,
	MatAutocompleteSelectedEvent,
	MatAutocompleteTrigger,
	MatOption
} from "@angular/material/autocomplete";
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from "@angular/forms";
import { MatFormField, MatInput, MatLabel } from "@angular/material/input";
import { resource } from "../../signals/resource";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { AutocompleteMethod } from "./models/autocomplete-method";

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

	filteredData = resource({
		request: this.search,
		initialValue: [],
		loader: (search) => this.method()({search})
	});

	onSelect($event: MatAutocompleteSelectedEvent) {
		this.control().setValue($event.option.value.id);
		this.internalForm.controls.search.setValue($event.option.value.name);
	}

	ngOnInit() {
		this.control().valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(value => {
			this.internalForm.controls.search.setValue(value, {emitEvent: false})
		})
	}
}
