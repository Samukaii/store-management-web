import { NoResultsActionsFn } from "../models/no-results-actions-fn";
import { NoResultsAutoCreationOptions } from "../models/no-results-auto-creation.options";
import { take } from "rxjs";

export const autoCreation = (optionsFn: (searchValue: string) => NoResultsAutoCreationOptions) => {
	const noResults: NoResultsActionsFn = noResultsOptions => {
		const options = optionsFn(noResultsOptions.searchValue);

		return {
			message: `Criar "${noResultsOptions.searchValue}"`,
			icon: options.noResultsIcon,
			action: () => {
				const options = optionsFn(noResultsOptions.searchValue);
				const key = options.key ?? 'name';

				options.method({[key]: noResultsOptions.searchValue}).pipe(take(1)).subscribe(result => {
					noResultsOptions.control.setValue(result.id);
					noResultsOptions.reload();
				});
			}
		}
	}

	return noResults;
}
