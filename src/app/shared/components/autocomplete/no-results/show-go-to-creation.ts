import { NoResultsShowGoToCreationOptions } from "../models/no-results-show-go-to-creation.options";
import { inject } from "@angular/core";
import { FormPersistenceService } from "../src/app/core/services/form-persistence/form-persistence.service";
import { DialogService } from "../../../services/dialog/dialog.service";
import { NavigationContextService } from "../src/app/core/components/navigation-context/navigation-context.service";
import { Router } from "@angular/router";
import { NoResultsActionsFn } from "../models/no-results-actions-fn";

export const showGoToCreation = (optionsFn: (searchValue: string) => NoResultsShowGoToCreationOptions) => {
	const persistenceService = inject(FormPersistenceService);
	const dialog = inject(DialogService);
	const context = inject(NavigationContextService);
	const router = inject(Router);

	const noResults: NoResultsActionsFn = noResultsOptions => {
		const options = optionsFn(noResultsOptions.searchValue);

		return {
			message: `Adicionar "${noResultsOptions.searchValue}"`,
			icon: options.noResultsIcon,
			action: () => {
				const {destination, source} = optionsFn(noResultsOptions.searchValue);

				if (destination.persistForm)
					persistenceService.add(destination.persistForm.key, destination.persistForm.value);

				if (source.persistForm)
					persistenceService.add(source.persistForm.key, source.persistForm.value);

				context.registerContext({
					message: options.source.message,
					icon: options.source.icon,
					url: router.url
				});

				dialog.closeAll();
				router.navigateByUrl(destination.url);
			}
		}
	}

	return noResults;
}
