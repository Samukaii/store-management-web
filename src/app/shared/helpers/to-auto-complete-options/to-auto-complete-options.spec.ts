import { of } from 'rxjs';
import { toAutoCompleteOptions } from './to-auto-complete-options';
import { take } from 'rxjs/operators';
import { Generic } from "src/app/shared/models/generic";

describe(toAutoCompleteOptions.name, () => {
	describe('Default behavior with "id" and "name" properties', () => {
		it('must map an array of objects to AutocompleteOption[] using default id and name properties', () => {
			const source$ = of<Generic[]>([
				{ id: 1, name: 'Option 1' },
				{ id: 2, name: 'Option 2' },
			]);

			source$.pipe(toAutoCompleteOptions()).pipe(take(1)).subscribe(result => {
				expect(result).toEqual([
					{ id: 1, name: 'Option 1' },
					{ id: 2, name: 'Option 2' },
				]);
			});
		});
	});

	describe('Custom property names', () => {
		it('must map an array of objects to AutocompleteOption[] using custom properties', () => {
			const source$ = of<Generic[]>([
				{ customId: 101, customName: 'Custom Option 1' },
				{ customId: 102, customName: 'Custom Option 2' },
			]);

			source$.pipe(toAutoCompleteOptions('customId', 'customName')).pipe(take(1)).subscribe(result => {
				expect(result).toEqual([
					{ id: 101, name: 'Custom Option 1' },
					{ id: 102, name: 'Custom Option 2' },
				]);
			});
		});
	});

	describe('Edge cases', () => {
		it('must handle an empty array', () => {
			const source$ = of<Generic[]>([]);

			source$.pipe(toAutoCompleteOptions()).pipe(take(1)).subscribe(result => {
				expect(result).toEqual([]);
			});
		});

		it('must handle objects missing the specified properties', () => {
			const source$ = of<Generic[]>([
				{ id: 1, invalidProperty: 'Invalid Option 1' },
				{ id: 2, name: 'Valid Option 2' },
			]);

			source$.pipe(toAutoCompleteOptions('id', 'name')).pipe(take(1)).subscribe(result => {
				expect(result).toEqual([
					{ id: 1, name: undefined }, // Missing property maps to undefined
					{ id: 2, name: 'Valid Option 2' },
				]);
			});
		});
	});
});
