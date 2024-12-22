import { map, Observable } from "rxjs";
import { AutocompleteOption } from "../components/autocomplete/models/autocomplete-option";

export const toAutoCompleteOptions = (idProperty = "id", nameProperty = "name") => <T extends any[]>(source: Observable<T>) => {
	return source.pipe(
		map((source): AutocompleteOption[] => source.map(item => ({
			id: item[idProperty],
			name: item[nameProperty],
		})))
	)
}
