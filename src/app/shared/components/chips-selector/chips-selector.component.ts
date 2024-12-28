import { Component, input, signal } from '@angular/core';
import { MatChipListbox, MatChipOption } from "@angular/material/chips";
import { AutocompleteOption } from "../autocomplete/models/autocomplete-option";
import { ControlValueAccessor } from "@angular/forms";
import { provideAccessor } from "../../di/providers/provide-accessor";


@Component({
	selector: 'app-chips-selector',
	imports: [
		MatChipOption,
		MatChipListbox
	],
	templateUrl: './chips-selector.component.html',
	styleUrl: './chips-selector.component.scss',
	providers: [
		provideAccessor(ChipsSelectorComponent)
	]
})
export class ChipsSelectorComponent implements ControlValueAccessor {
	options = input<AutocompleteOption[]>([]);

	onChange?: (value: number | string) => void;
	onTouched?: () => void;

	selected = signal<number | string | null>(null);

	select(option: AutocompleteOption) {
		this.applyChange(option.id);
	}

	registerOnChange(fn: () => void) {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void) {
		this.onTouched = fn;
	}

	writeValue(value: number | string) {
		this.applyChange(value);
	}

	applyChange(value: number | string) {
		this.selected.set(value);
		this.onChange?.(value);
		this.onTouched?.();
	}
}
